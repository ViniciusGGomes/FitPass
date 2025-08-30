export class CheckInOnTheSameDay extends Error {
  constructor(){
    super("You can not to check in twice in the same day")
  }
}