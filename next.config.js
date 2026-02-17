/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Se o repositório não for o principal (username.github.io), você precisará configurar o basePath.
  // Exemplo: basePath: '/nome-do-repositorio',
  // Lembre-se de remover o basePath quando configurar o domínio personalizado.
};

module.exports = nextConfig;
