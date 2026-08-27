import type { RootState } from '../../redux/store'

export const cards = (state: RootState) => state.cards.cards
export const searches = (state: RootState) => state.search.search
export const categories = (state: RootState) => state.sorts.category
export const carts = (state: RootState) => state.carts.items
