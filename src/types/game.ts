export interface GameRoom {
  key: string;
  name: string;
  players: string;
  mode: string;
  map: string;
}

export interface GameRoomListProps {
  onJoin?: (roomKey: string) => void;
}
