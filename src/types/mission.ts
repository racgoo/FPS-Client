export interface Mission {
  name: string;
  description: string;
  progress: number;
  reward: string;
}

export interface MissionListProps {
  onMissionComplete?: (missionName: string) => void;
}
