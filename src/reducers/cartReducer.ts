import { Product } from "@/types/Product"; // Importa o tipo Product do arquivo de tipos
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Importa funções da @reduxjs/toolkit

// Define a interface do estado do carrinho
interface CartState {
	products: Array<{data:Product, qt:number}>; // Array de produtos, cada um com uma quantidade (qt)
	address: any[]; // Array de endereços (tipo pode ser especificado melhor se conhecido)
	discount: number; // Valor do desconto
	delivery: number; // Custo da entrega
}

// Estado inicial do carrinho
const initialState: CartState = {
	products:[], // Começa com um array vazio de produtos
	address: [], // Começa com um array vazio de endereços
	discount: 0, // Sem desconto inicialmente
	delivery: 0 // Sem custo de entrega inicialmente
};

function deproxy(value: any): any {
    return JSON.parse(JSON.stringify(value));
}

// Cria o slice do Redux para o carrinho
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      	// Define o reducer para adicionar produtos ao carrinho
      	addProduct: (state, action: PayloadAction<{data:Product, qt:number}>) => {
			const { data, qt } = action.payload;

			console.log("State Products (Before):", deproxy(state.products)); // Log do estado atual dos produtos

			const index = state.products.findIndex(item => item.data.id === data.id);
		
			if (index > -1) {
				state.products[index].qt += qt;
			} else {
				state.products.push({ data, qt });
			}
			console.log("State Products (After):", deproxy(state.products)); // Log do estado atual dos produtos
    	},
		removeProduct: (state, action:PayloadAction<{id:number}>) => {
			const {id} = action.payload;

			const index = state.products.findIndex(item => item.data.id == id);

			if (index > -1) {
				if(state.products[index].qt > 1) {
					state.products[index].qt -= 1;
				} else {
					state.products.splice(index, 1);
				}
			}	
		}
  	},
});

// Exporta as ações e o reducer do slice
export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;