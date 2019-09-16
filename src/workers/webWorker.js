function makeWebWorker(worker, commands) {
    // Stringify worker function and commands definition
    const code = worker.toString();
    const commandsObjectLine = `const commands = ${JSON.stringify(commands)};`;

    // Find the beginning of the function scope
    const codeScopeStart = code.indexOf('{') + 1;

    // Inject commands definition at the beginning of the function scope
    const codeWithInjectedCommands = `
        ${code.slice(0, codeScopeStart)}\n
        ${commandsObjectLine}
        ${code.slice(codeScopeStart)}
    `;

    // Make blob from function and pass it to worker
    const blob = new Blob([`(${codeWithInjectedCommands})()`]);
    return new Worker(URL.createObjectURL(blob));
}

export default makeWebWorker;