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
	players []player
	clips   []clip
}

type player struct {
	name string
	conn websocket.Conn
}

type clip struct {
	points   int32
	yesVotes []*player
	noVote   []*player
	kill     killStatus
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var manager *bets_manager

func main() {
	router := gin.Default()
	manager = new(bets_manager)
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
			//BAD dont go here do somthing :)
			return
		}
		protoErr := proto.Unmarshal(msg, &message)
		fmt.Printf("%v+\n", message)
		if protoErr != nil {
			//BAD dont go here do somthing :)
			return
		}
	}
	return
}
