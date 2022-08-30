export type Session = {
  id: string;
  data: Record<string, any>;
};

const sessions: Session[] = [];

export default sessions;
