import axios from 'axios';
const test = async () => {
    try {
        const res = await axios.post('http://localhost:3000/api/register', { name: "test", email: "test@test.com" });
        console.log("Success:", res.status, res.data);
    } catch (e) {
        console.error("Error:", e.response ? `[${e.response.status}] ${JSON.stringify(e.response.data)}` : e.message);
    }
}
test();
