async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    if (Array.isArray(data)) {
      console.log('Products API response length:', data.length);
    } else {
      console.log('API Error/Object Response:', JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error('API Test failed:', e.message);
  }
}
test();
