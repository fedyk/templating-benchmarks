
module.exports = (data) => `
<html>
    <head>
        <title>${data.title}</title>
    </head>
    <body>
        <p>${data.text}</p>
        ${data.projects.map(project => `
            <a href="${project.url}">${project.name}</a>
            <p>${project.description}</p>
        `).join('')}

        ${data.projects.length === 0 && "No projects"}
    </body>
</html>
`;