export interface SubjectInterface {
  id: string;
  caption: string;
}

export interface QuestionInterface {
  ai: [string];
  subject: [SubjectInterface];
  random: [string];
  type: string;
}
