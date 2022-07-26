import { Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import api from "../product/api";
import { Product } from "../product/Types";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from "framer-motion";
interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(null);

  const text = React.useMemo(() => {
    return cart
      .reduce(
        (message, product) =>
          message.concat(
            `* ${product.title} - ${parseCurrency(product.price)}\n`
          ),
        ``
      )
      .concat(
        `\nTotal: ${parseCurrency(
          cart.reduce((total, product) => total + product.price, 0)
        )}`
      );
  }, [cart]);

  return (
    <LayoutGroup>
      <Stack spacing={6}>
        <Grid
          gridGap={6}
          templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        >
          {products?.map((product) => (
            <Stack
              spacing={3}
              key={product.id}
              bg="gray.100"
              borderRadius="md"
              p={4}
            >
              <Stack spacing={1}>
                <Image
                  maxH="128px"
                  objectFit="contain"
                  src={product.image}
                  alt={product.title}
                  as={motion.img}
                  layoutId={product.image}
                  cursor="pointer"
                  onClick={() => setSelectedImage(product.image)}
                />
                <Text>{product.title}</Text>
                <Text color="green.500" fontSize="sm" fontWeight="500">
                  {parseCurrency(product.price)}
                </Text>
              </Stack>

              <Button
                onClick={() => setCart((cart) => cart.concat(product))}
                colorScheme="primary"
                size="sm"
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>
        <AnimatePresence>
          {Boolean(cart.length) && (
            <Stack
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              as={motion.div}
              pb={4}
              position="sticky"
              bottom={0}
              align="center"
            >
              <Button
                maxW="400px"
                width="100%"
                as={Link}
                colorScheme="whatsapp"
                href={`https://wa.me/2995324107?text=${encodeURIComponent(
                  text
                )}`}
                isExternal
              >
                Completar pedido ({cart.length})
              </Button>
            </Stack>
          )}
        </AnimatePresence>
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key="backdrop"
            alignItems="center"
            justifyContent="center"
            as={motion.div}
            layoutId={selectedImage}
            bgColor="rgba(0,0,0,.5)"
            position="fixed"
            top={0}
            left={0}
            width="100%"
            onClick={() => setSelectedImage(null)}
          >
            <Image key="image" src={selectedImage} height="100vh" />
          </Flex>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    props: {
      products,
    },
    // tiempo de actualizacion de datos de la cuenta en segundos
    revalidate: 10,
  };
};

export default IndexRoute;
