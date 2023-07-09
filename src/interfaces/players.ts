export interface IPlayerData{ 
  id: string,
  name: string,
  position: string,
  details: {
    age: number,
    height: number,
    weight: number,
    wingspan: number
  }
}