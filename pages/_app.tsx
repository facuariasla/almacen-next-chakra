// pages/_app.js
import React from "react";
import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Almacen Pepe</title>
      </Head>
      <Box p={4}>
      <Container
        background="white"
        boxShadow="md"
        maxWidth="container.xl"
        p={4}
        borderRadius='sm'
      >
        <VStack mb={6}>
          <Image borderRadius={9999} src="https://placeimg.com/180/180/tech"/>
          <Heading>Almacen</Heading>
          <Text>El almacen de Pepe</Text>
        </VStack>
        <Divider my={6}/>
        <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
