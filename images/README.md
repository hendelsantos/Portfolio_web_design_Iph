# Pasta de Imagens

Esta pasta é destinada às imagens do site. Atualmente o site utiliza imagens do Unsplash via CDN, mas você pode substituir por imagens locais seguindo esta estrutura:

## Estrutura Recomendada:

```
images/
├── hero/
│   └── hero-iphone.jpg          # Imagem principal do banner
├── products/
│   ├── iphone-15-pro-max.jpg    # iPhone 15 Pro Max
│   ├── iphone-14-pro.jpg        # iPhone 14 Pro
│   ├── iphone-13-pro-max.jpg    # iPhone 13 Pro Max
│   ├── iphone-12.jpg            # iPhone 12
│   ├── iphone-se-2022.jpg       # iPhone SE 2022
│   └── iphone-11.jpg            # iPhone 11
├── about/
│   └── loja-tudocell.jpg        # Imagem da loja
└── icons/
    ├── favicon.ico              # Favicon
    └── logo.png                 # Logo da loja
```

## Especificações Recomendadas:

### Imagem Principal (Hero)

- Tamanho: 1200x800px
- Formato: JPG ou WebP
- Qualidade: 85-90%

### Produtos

- Tamanho: 600x600px
- Formato: JPG ou WebP
- Qualidade: 80-85%
- Fundo: Branco ou transparente

### Loja

- Tamanho: 800x600px
- Formato: JPG
- Qualidade: 85%

## Como Substituir:

1. Adicione suas imagens nesta pasta seguindo a estrutura acima
2. No arquivo `index.html`, substitua as URLs do Unsplash pelos caminhos locais:

   ```html
   <!-- Ao invés de -->
   <img
     src="https://images.unsplash.com/photo-1695048133142-1a20484d2569..."
     alt="iPhone"
   />

   <!-- Use -->
   <img src="images/products/iphone-15-pro-max.jpg" alt="iPhone" />
   ```

## Otimização:

Para melhor performance, recomenda-se:

- Comprimir as imagens antes de usar
- Usar formatos modernos como WebP quando possível
- Implementar lazy loading
- Criar versões responsivas (diferentes tamanhos para mobile/desktop)

## Ferramentas Recomendadas:

- **TinyPNG**: Para compressão de imagens
- **Squoosh**: Para conversão e otimização
- **ImageOptim**: Para otimização batch

## Direitos Autorais:

Certifique-se de que todas as imagens utilizadas:

- São de sua autoria
- Possuem licença comercial
- Foram adquiridas de bancos de imagens pagos
- São gratuitas e permitem uso comercial

As imagens atualmente utilizadas são do Unsplash e possuem licença gratuita para uso comercial.
