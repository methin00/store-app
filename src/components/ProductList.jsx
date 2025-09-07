import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"

export default function ProductList({ products }) {
    return (
        <div>
            <Grid container spacing={3}>
                {
                    products.map((p) => {
                        return (<Grid key={p.id} xs={6} md={4} lg={3} >
                            <ProductCard product={p} />
                        </Grid>)
                    })
                }
            </Grid>
        </div>
    )
}