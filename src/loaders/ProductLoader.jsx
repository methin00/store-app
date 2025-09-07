export async function productsLoader() {
    const response = await fetch("http://localhost:5000/products")
    if(response.ok)
        return response.json()
}