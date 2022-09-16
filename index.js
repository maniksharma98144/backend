const app = require("./server");
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on at http://localhost:${PORT}`);
});