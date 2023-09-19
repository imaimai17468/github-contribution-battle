'use client'
import { Text, VStack, Input, HStack, Button, Link } from '@kuma-ui/core'
import { useState } from 'react'
import axios from 'axios'
import { FetchedContributions } from '@/types/contribution'
import { ContributionMap } from '@/features'

const API_URL = 'https://github-contributions-api.deno.dev'
const fetchContributions = async (userName: string) => {
  const res = await axios.get(`${API_URL}/${userName}.json`)
  return res.data as FetchedContributions
}

export default function Home() {
  const [userNames, setUserNames] = useState<string[]>([])
  const [userContributions, setUserContributions] = useState<
    FetchedContributions[]
  >([])

  const onSubmit = () => {
    setUserContributions([])

    Promise.all(
      userNames.map(async (userName) => {
        const contributions = await fetchContributions(userName)
        return contributions
      }),
    ).then((contributions) => {
      setUserContributions(contributions)
    })
  }

  return (
    <main>
      <Text fontSize={24} p={8}>
        GitHub Contribution Battle
      </Text>
      <VStack alignItems="center" my={48}>
        <HStack gap={16} width="100%" justify="center" mb={48}>
          <Input
            p={8}
            fontSize={16}
            placeholder="Enter a GitHub username (e.g. hoge, fuga, piyo)"
            border="1px solid #a5a5a5"
            borderRadius={8}
            width={'50%'}
            onChange={(e) => {
              setUserContributions([])
              setUserNames(e.target.value.replaceAll(' ', '').split(','))
            }}
          />
          <Button
            borderRadius={8}
            border="none"
            bg="#a5a5a5"
            color="#efefef"
            px={16}
            _hover={{ bg: '#252525' }}
            transition={'all 0.2s ease-in-out'}
            onClick={onSubmit}
          >
            Battle!
          </Button>
        </HStack>
        {userContributions.length > 0 && (
          <ContributionMap
            users={userNames}
            contributions={userContributions.map((contributions) =>
              contributions.contributions.flat(),
            )}
          />
        )}
      </VStack>
      <HStack alignItems="center" gap={8} p={8} position="fixed" bottom={0}>
        <Text fontSize={24}>created by</Text>
        <Link
          href="https://github.com/imaimai17468"
          target="_blank"
          rel="noopener noreferrer"
        >
          imaimai17468
        </Link>
        <Link
          href="https://github.com/imaimai17468/github-contribution-battle"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </HStack>
    </main>
  )
}
