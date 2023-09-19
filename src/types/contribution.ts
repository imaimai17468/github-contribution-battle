export type Contribution = {
  color: string
  contributionCount: number
  contributionLevel: string
  date: string
}

export type FetchedContributions = {
  contributions: Contribution[][]
  totalContributions: number
}
