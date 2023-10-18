#!/bin/sh

protoc -I=/home/nickl/Desktop/programing/javascript/wik-bets/proto --go_out=/home/nickl/Desktop/programing/javascript/wik-bets/wik-bet-backend/protoGoOut/ wik.proto
echo "finished compiling"