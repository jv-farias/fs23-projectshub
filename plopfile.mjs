// eslint-disable-next-line import/no-anonymous-default-export
export default (plop) => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Digite o nome do componente",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.mjs.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/stories.mjs.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "templates/test.mjs.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/index.mjs.hbs",
      }
    ],
  });
};
