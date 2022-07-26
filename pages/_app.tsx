// pages/_app.js
import React from "react";
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Almacen Pepe</title>
        <link rel="icon" href="/logopepes.png" />
      </Head>
      <Box p={4}>
        <Container
          background="white"
          boxShadow="md"
          maxWidth="container.xl"
          p={4}
          borderRadius="sm"
        >
          <Stack display="flex" w="100%" justify="center" align="center">
            <Stack
              border="16px solid red"
              w="150px"
              h="150px"
              borderRadius="50%"
              borderTopRightRadius={0}
              borderBottomLeftRadius={0}
              display="flex"
              align="center"
              justify="center"
            >
              <Text
                color="red"
                fontWeight={700}
                fontSize={30}
                m="0"
                lineHeight={1}
              >
                PEPE&apos;s
              </Text>
              <Text
                color="red"
                fontWeight={700}
                fontSize={16}
                m="0"
                lineHeight={1}
                marginTop="0px"
              >
                STORE
              </Text>
            </Stack>
          </Stack>

          <Divider my={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
