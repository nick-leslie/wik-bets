package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/nick-leslie/wik-bet-backend/protoGoOut/github.com/nick-leslie/proto/wik-bet-backend"
	"google.golang.org/protobuf/proto"
	"net/http"
)

type killStatus uint64

const (
	undesided killStatus = 0
	kill      killStatus = 1
	nokill    killStatus = 2
)

type bets_manager struct {
	players        map[string]string
	playersPlaying map[string]*websocket.Conn
	connToUsername map[*websocket.Conn]string
	clips          []clip
}

// TODO make it so we pereserve players when close connection
type clip struct {
	yesVotes     []playerVote
	noVote       []playerVote
	kill         killStatus
	payoutStatus bool
}
type playerVote struct {
	points int64
	vote   bool
	player string
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var manager bets_manager

func main() {
	router := gin.Default()
	manager = makeManager()
	manager.makeCLip()
	router.GET("/ws", func(ctx *gin.Context) {
		conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			fmt.Printf("%s", err)
		}
		go handleClient(conn)
	})
	runErr := router.Run(":3001")
	if runErr != nil {
		return
	}
}

func handleClient(conn *websocket.Conn) {
	for true {
		defer func(conn *websocket.Conn) {
			err := conn.Close()
			if err != nil {

			}
		}(conn)
		message := wik_bet_backend.WsMessage{}
		_, msg, readErr := conn.ReadMessage()
		if readErr != nil {
			fmt.Printf("closed connection")
			manager.removePlayerFromCon(conn)
			fmt.Printf("%+v\n", manager)
			return
		}
		protoErr := proto.Unmarshal(msg, &message)
		cmd := message.GetCmd()
		fmt.Printf("%s\n", message.String())
		fmt.Printf("%+v\n", manager)
		switch cmd {
		case wik_bet_backend.WsMessage_REGISTER:
			username := message.GetPlayer().GetUsername()
			manager.addPlayer(username, conn)
			break
		case wik_bet_backend.WsMessage_BET:
			fmt.Printf("betting")
			fmt.Printf("%+v\n", manager.clips[len(manager.clips)-1])
			username := message.GetPlayer().GetUsername()
			pointsBet := message.GetBet().GetPoints()
			netVote := message.GetBet().GetVote()
			vote := new(playerVote)
			vote.player = username
			vote.points = pointsBet
			vote.vote = netVote
			if netVote {
				manager.clips[len(manager.clips)-1].yesVotes = append(manager.clips[len(manager.clips)-1].yesVotes, *vote)
				//TODO do sql stuff here ?
			} else {
				manager.clips[len(manager.clips)-1].noVote = append(manager.clips[len(manager.clips)-1].noVote, *vote)
				//TODO do sql stuff here ?
			}
			fmt.Printf("%+v\n", manager.clips[len(manager.clips)-1])
			break
		case wik_bet_backend.WsMessage_QUIT:
			username := message.GetPlayer().GetUsername()
			manager.removePlayer(username)
			return
		case wik_bet_backend.WsMessage_CREATE_CLIP:
			manager.makeCLip()
			//TODO do sql stuff here ?
			break
		case wik_bet_backend.WsMessage_PAYOUT:
			break

		}
		if protoErr != nil {
			//BAD dont go here do somthing :)
			return
		}
	}
	return
}
func makeManager() bets_manager {
	manager := bets_manager{}
	manager.players = make(map[string]string)
	manager.playersPlaying = make(map[string]*websocket.Conn)
	manager.connToUsername = make(map[*websocket.Conn]string)

	return manager
}

func (bm *bets_manager) broadCastMessage(msg []byte) {

	for _, v := range bm.playersPlaying {
		writer, createWriteErr := v.NextWriter(2)
		if createWriteErr != nil {
			return
		}
		_, err := writer.Write(msg)
		if err != nil {
			return
		}
	}
}

func (bm *bets_manager) addPlayer(name string, conn *websocket.Conn) {
	bm.players[name] = name
	bm.playersPlaying[name] = conn
	bm.connToUsername[conn] = name
}
func (bm *bets_manager) makeCLip() {
	newClip := clip{
		yesVotes:     *new([]playerVote),
		noVote:       *new([]playerVote),
		kill:         0,
		payoutStatus: false,
	}
	bm.clips = append(bm.clips, newClip)
}
func (bm *bets_manager) removePlayer(name string) {
	if _, ok := bm.playersPlaying[name]; ok {
		delete(bm.playersPlaying, name)
	}
}
func (bm *bets_manager) removePlayerFromCon(conn *websocket.Conn) {
	name := bm.connToUsername[conn]
	if _, ok := bm.connToUsername[conn]; ok {
		delete(bm.connToUsername, conn)
	}
	if _, ok := bm.playersPlaying[name]; ok {
		delete(bm.playersPlaying, name)
	}
}
