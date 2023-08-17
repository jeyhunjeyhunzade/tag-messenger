export interface AppContextShape {
  messages: Message[];
  tagsData: TagsData[] | undefined;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ActionsResponse {
  message: string;
}

export interface SendMessageParams {
  message: string;
  tags: string[];
}

export interface GetMessageParams {
  tags: string[];
}

export interface DeleteIconProps {
  onClick: (tag: string) => void;
  data: string;
}

export interface Message {
  id: number;
  message: string;
}

export interface MessageData {
  messageId: number;
  message: string;
  tags: string[];
}

export interface NewMessage {
  newMessage: MessageData;
}

export interface TagsData {
  id: number;
  name: string;
}
