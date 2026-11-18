# Presets de cores do site

Edite o preset ativo em `config/colors.json`. Os valores usam hexadecimal `#RRGGBB`.

- `activePreset` escolhe qual conjunto de cores o site usa.
- `presets` pode conter outros conjuntos; cada conjunto deve definir as chaves do preset `hudson`.
- `purple` define o roxo institucional e `purpleDeep` define as superfícies roxas escuras. Para manter o mesmo roxo da marca, deixe ambos com o mesmo valor.
- **Sempre que mudar o roxo**, execute `npm run colors:sync`. O script atualiza os tokens roxos em `src/styles.css`, o retângulo de fundo em `Fav-icon.svg`, sua cópia publicada em `public/favicon.svg` e o `theme-color` em `index.html`.
- `npm run build` executa essa sincronização automaticamente antes de compilar.

Depois de editar o preset, rode `npm run colors:sync` para ver as mudanças também no servidor de desenvolvimento.
