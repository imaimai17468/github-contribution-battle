import { Box, Flex, Grid, HStack, Text, VStack } from '@kuma-ui/core'
import { useMemo, useState } from 'react'
import { Contribution } from '../../types/contribution'

type ContributionMapProps = {
  users: string[]
  contributions: Contribution[][]
}

export const ContributionMap = ({
  contributions,
  users,
}: ContributionMapProps) => {
  const userColors = useMemo(() => {
    const colors = Array.from({ length: users.length }).map(() =>
      Math.floor(Math.random() * 16777215).toString(16),
    )
    console.log(colors)
    return colors
  }, [users])

  const userPoints = useMemo(() => {
    const points = Array.from({ length: users.length }).map(() => 0)
    Array.from({ length: contributions[0].length }).forEach((_, i) => {
      let max = 0
      let maxIndex = 0
      contributions.forEach((contribution, j) => {
        if (contribution[i].contributionCount > max) {
          max = contribution[i].contributionCount
          maxIndex = j
        }
      })
      if (max !== 0) points[maxIndex] += 1
    })
    return points
  }, [contributions])

  const [isContributionTooltipShow, setIsContributionTooltipShow] = useState<
    boolean[]
  >(Array.from({ length: contributions[0].length }).map(() => false))

  return (
    <Box display="flex" flexDir="column" gap={48} width="80%">
      <HStack justify="center" alignItems="center" gap={16}>
        {users.map((user, index) => (
          <>
            <VStack alignItems="center" gap={4}>
              <Text key={user} fontSize={24} color={`#${userColors[index]}`}>
                {user}
              </Text>
              <Text fontSize={24} color={`#${userColors[index]}`}>
                {userPoints[index]}
              </Text>
              {userPoints[index] === Math.max(...userPoints) && (
                <Text fontSize={24} color={`#${userColors[index]}`}>
                  Winner!
                </Text>
              )}
            </VStack>
            {index !== users.length - 1 && <Text>VS</Text>}
          </>
        ))}
      </HStack>
      <Grid
        gridTemplateColumns="repeat(7, 1fr)"
        gap={16}
        justifyItems="center"
        width="fit-content"
        margin="0 auto"
      >
        {Array.from({ length: contributions[0].length }).map((_, i) => (
          <Box position="relative" key={i} display="inline-block">
            {isContributionTooltipShow[i] && (
              <VStack
                bg="rgba(0, 0, 0, 0.8)"
                borderRadius={8}
                padding={8}
                boxShadow="0 0 4px rgba(0, 0, 0, 0.4)"
                alignItems="center"
                position="absolute"
                width={200}
                transform="translateY(-100%)"
                z-index={10}
              >
                <Text fontSize={16} color="white">
                  {contributions[0][i].date}
                </Text>
                {contributions.map((contribution, j) => (
                  <Text fontSize={16} key={j} color="white">
                    {users[j]} : {contribution[i].contributionCount}
                  </Text>
                ))}
              </VStack>
            )}
            <Flex
              key={i}
              borderRadius={4}
              justify="center"
              alignItems="center"
              width={32}
              height={32}
              boxShadow="0 0 4px rgba(0, 0, 0, 0.4)"
              onMouseEnter={() => {
                setIsContributionTooltipShow(
                  isContributionTooltipShow.map((_, j) => j === i),
                )
              }}
              onMouseLeave={() => {
                setIsContributionTooltipShow(
                  isContributionTooltipShow.map(() => false),
                )
              }}
              bg={
                contributions.every((contribution) =>
                  contribution[i].contributionCount === 0 ? true : false,
                )
                  ? 'white'
                  : `#${
                      userColors[
                        contributions.reduce((prev, curr, j) => {
                          if (
                            curr[i].contributionCount >
                            contributions[prev][i].contributionCount
                          ) {
                            return j
                          }
                          return prev
                        }, 0)
                      ]
                    }`
              }
            />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default ContributionMap
