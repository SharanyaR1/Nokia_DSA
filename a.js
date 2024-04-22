function formatPodStatus(inputStr) {
    // Split the input string into lines
    const lines = inputStr.split('\n');

    // Extract column headings and data
    const columnHeadings = lines[0].split(/\s+/);
    const data = lines.slice(1).map(line => line.split(/\s+/));

    // Find maximum length for each column
    const columnWidths = columnHeadings.map((_, i) =>
        Math.max(...data.map(row => row[i].toString().length))
    );

    // Format each line
    const formattedLines = [];
    formattedLines.push(columnHeadings.join(' '));
    data.forEach(row => {
        const formattedRow = row.map((item, i) =>
            item.toString().padEnd(columnWidths[i])
        ).join(' ');
        formattedLines.push(formattedRow);
    });

    // Join the formatted lines
    return formattedLines.join('\n');
}

// Example usage
const inputStr = "NAME READY STATUS RESTARTS AGE\n" +
    "g-g-charts-6bf9cbc9db-xgwzj 1/1 Running 0 22m\n" +
    "g-httplbchart-6fbc759dc8-c62s5 1/1 Running 0 22m\n" +
    "g-regtriggerchart-675c4ddf54-sk8xh 1/1 Running 0 22m\n" +
    "g-udmuecmchart-565448c88d-pjgs5 1/1 Running 0 22m";

const formattedOutput = formatPodStatus(inputStr);
console.log(formattedOutput);
