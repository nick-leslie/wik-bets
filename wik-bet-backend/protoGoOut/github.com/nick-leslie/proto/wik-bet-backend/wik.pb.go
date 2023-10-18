// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.29.1
// 	protoc        v3.21.12
// source: wik.proto

package wik_bet_backend

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type WsMessageCommand int32

const (
	WsMessage_REGISTER    WsMessageCommand = 0
	WsMessage_BET         WsMessageCommand = 1
	WsMessage_QUIT        WsMessageCommand = 2
	WsMessage_CREATE_CLIP WsMessageCommand = 3
	WsMessage_PAYOUT      WsMessageCommand = 4
)

// Enum value maps for WsMessageCommand.
var (
	WsMessageCommand_name = map[int32]string{
		0: "REGISTER",
		1: "BET",
		2: "QUIT",
		3: "CREATE_CLIP",
		4: "PAYOUT",
	}
	WsMessageCommand_value = map[string]int32{
		"REGISTER":    0,
		"BET":         1,
		"QUIT":        2,
		"CREATE_CLIP": 3,
		"PAYOUT":      4,
	}
)

func (x WsMessageCommand) Enum() *WsMessageCommand {
	p := new(WsMessageCommand)
	*p = x
	return p
}

func (x WsMessageCommand) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (WsMessageCommand) Descriptor() protoreflect.EnumDescriptor {
	return file_wik_proto_enumTypes[0].Descriptor()
}

func (WsMessageCommand) Type() protoreflect.EnumType {
	return &file_wik_proto_enumTypes[0]
}

func (x WsMessageCommand) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Do not use.
func (x *WsMessageCommand) UnmarshalJSON(b []byte) error {
	num, err := protoimpl.X.UnmarshalJSONEnum(x.Descriptor(), b)
	if err != nil {
		return err
	}
	*x = WsMessageCommand(num)
	return nil
}

// Deprecated: Use WsMessageCommand.Descriptor instead.
func (WsMessageCommand) EnumDescriptor() ([]byte, []int) {
	return file_wik_proto_rawDescGZIP(), []int{0, 0}
}

type WsMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Cmd *WsMessageCommand `protobuf:"varint,1,req,name=cmd,enum=wik.WsMessageCommand" json:"cmd,omitempty"`
}

func (x *WsMessage) Reset() {
	*x = WsMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_wik_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *WsMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*WsMessage) ProtoMessage() {}

func (x *WsMessage) ProtoReflect() protoreflect.Message {
	mi := &file_wik_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use WsMessage.ProtoReflect.Descriptor instead.
func (*WsMessage) Descriptor() ([]byte, []int) {
	return file_wik_proto_rawDescGZIP(), []int{0}
}

func (x *WsMessage) GetCmd() WsMessageCommand {
	if x != nil && x.Cmd != nil {
		return *x.Cmd
	}
	return WsMessage_REGISTER
}

type WsMessagePlayer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Username *string `protobuf:"bytes,1,req,name=username" json:"username,omitempty"`
}

func (x *WsMessagePlayer) Reset() {
	*x = WsMessagePlayer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_wik_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *WsMessagePlayer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*WsMessagePlayer) ProtoMessage() {}

func (x *WsMessagePlayer) ProtoReflect() protoreflect.Message {
	mi := &file_wik_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use WsMessagePlayer.ProtoReflect.Descriptor instead.
func (*WsMessagePlayer) Descriptor() ([]byte, []int) {
	return file_wik_proto_rawDescGZIP(), []int{0, 0}
}

func (x *WsMessagePlayer) GetUsername() string {
	if x != nil && x.Username != nil {
		return *x.Username
	}
	return ""
}

type WsMessageBet struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Points *int64 `protobuf:"varint,1,req,name=points" json:"points,omitempty"`
	Vote   *bool  `protobuf:"varint,2,req,name=vote" json:"vote,omitempty"`
}

func (x *WsMessageBet) Reset() {
	*x = WsMessageBet{}
	if protoimpl.UnsafeEnabled {
		mi := &file_wik_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *WsMessageBet) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*WsMessageBet) ProtoMessage() {}

func (x *WsMessageBet) ProtoReflect() protoreflect.Message {
	mi := &file_wik_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use WsMessageBet.ProtoReflect.Descriptor instead.
func (*WsMessageBet) Descriptor() ([]byte, []int) {
	return file_wik_proto_rawDescGZIP(), []int{0, 1}
}

func (x *WsMessageBet) GetPoints() int64 {
	if x != nil && x.Points != nil {
		return *x.Points
	}
	return 0
}

func (x *WsMessageBet) GetVote() bool {
	if x != nil && x.Vote != nil {
		return *x.Vote
	}
	return false
}

var File_wik_proto protoreflect.FileDescriptor

var file_wik_proto_rawDesc = []byte{
	0x0a, 0x09, 0x77, 0x69, 0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x03, 0x77, 0x69, 0x6b,
	0x22, 0xd9, 0x01, 0x0a, 0x0a, 0x77, 0x73, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12,
	0x29, 0x0a, 0x03, 0x63, 0x6d, 0x64, 0x18, 0x01, 0x20, 0x02, 0x28, 0x0e, 0x32, 0x17, 0x2e, 0x77,
	0x69, 0x6b, 0x2e, 0x77, 0x73, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x63, 0x6f,
	0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x52, 0x03, 0x63, 0x6d, 0x64, 0x1a, 0x24, 0x0a, 0x06, 0x70, 0x6c,
	0x61, 0x79, 0x65, 0x72, 0x12, 0x1a, 0x0a, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x02, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65,
	0x1a, 0x31, 0x0a, 0x03, 0x62, 0x65, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x70, 0x6f, 0x69, 0x6e, 0x74,
	0x73, 0x18, 0x01, 0x20, 0x02, 0x28, 0x03, 0x52, 0x06, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x12,
	0x12, 0x0a, 0x04, 0x76, 0x6f, 0x74, 0x65, 0x18, 0x02, 0x20, 0x02, 0x28, 0x08, 0x52, 0x04, 0x76,
	0x6f, 0x74, 0x65, 0x22, 0x47, 0x0a, 0x07, 0x63, 0x6f, 0x6d, 0x6d, 0x61, 0x6e, 0x64, 0x12, 0x0c,
	0x0a, 0x08, 0x52, 0x45, 0x47, 0x49, 0x53, 0x54, 0x45, 0x52, 0x10, 0x00, 0x12, 0x07, 0x0a, 0x03,
	0x42, 0x45, 0x54, 0x10, 0x01, 0x12, 0x08, 0x0a, 0x04, 0x51, 0x55, 0x49, 0x54, 0x10, 0x02, 0x12,
	0x0f, 0x0a, 0x0b, 0x43, 0x52, 0x45, 0x41, 0x54, 0x45, 0x5f, 0x43, 0x4c, 0x49, 0x50, 0x10, 0x03,
	0x12, 0x0a, 0x0a, 0x06, 0x50, 0x41, 0x59, 0x4f, 0x55, 0x54, 0x10, 0x04, 0x42, 0x2e, 0x5a, 0x2c,
	0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6e, 0x69, 0x63, 0x6b, 0x2d,
	0x6c, 0x65, 0x73, 0x6c, 0x69, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x77, 0x69, 0x6b,
	0x2d, 0x62, 0x65, 0x74, 0x2d, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64,
}

var (
	file_wik_proto_rawDescOnce sync.Once
	file_wik_proto_rawDescData = file_wik_proto_rawDesc
)

func file_wik_proto_rawDescGZIP() []byte {
	file_wik_proto_rawDescOnce.Do(func() {
		file_wik_proto_rawDescData = protoimpl.X.CompressGZIP(file_wik_proto_rawDescData)
	})
	return file_wik_proto_rawDescData
}

var file_wik_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_wik_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_wik_proto_goTypes = []interface{}{
	(WsMessageCommand)(0),   // 0: wik.ws_message.command
	(*WsMessage)(nil),       // 1: wik.ws_message
	(*WsMessagePlayer)(nil), // 2: wik.ws_message.player
	(*WsMessageBet)(nil),    // 3: wik.ws_message.bet
}
var file_wik_proto_depIdxs = []int32{
	0, // 0: wik.ws_message.cmd:type_name -> wik.ws_message.command
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_wik_proto_init() }
func file_wik_proto_init() {
	if File_wik_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_wik_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*WsMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_wik_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*WsMessagePlayer); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_wik_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*WsMessageBet); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_wik_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_wik_proto_goTypes,
		DependencyIndexes: file_wik_proto_depIdxs,
		EnumInfos:         file_wik_proto_enumTypes,
		MessageInfos:      file_wik_proto_msgTypes,
	}.Build()
	File_wik_proto = out.File
	file_wik_proto_rawDesc = nil
	file_wik_proto_goTypes = nil
	file_wik_proto_depIdxs = nil
}
