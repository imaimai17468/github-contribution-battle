import { Heading, Box, Input, Flex } from "@kuma-ui/core";

export default function Home() {
  return (
    <main className="bg-gray-100 h-screen">
      <Box p={8}>
        <Heading className="md:text-2xl text-xl">
          GitHub Contribution Battle
        </Heading>
        <Flex justifyContent="center" my={48}>
          <Input
            placeholder="Enter a GitHub username (hoge, huga, ...)"
            p={4}
            className="w-4/5 md:w-1/2 rounded-md border-gray-200 border"
          />
        </Flex>
      </Box>
    </main>
  );
}
