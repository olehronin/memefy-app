import {PageableRequest, Sort, SortBy, SortOrder} from "@/types/pageable.ts";

export const DEFAULT_PAGE_SIZE = 15;
export const DEFAULT_PAGE = 0;

export class PageableBuilder {
    private _page: number;
    private _size: number;
    private _sorts: Sort[];

    constructor({page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE, sorts = [], sort}: PageableRequest) {
        this._page = Math.max(0, page);
        this._size = Math.max(1, size);
        this._sorts = sort ? [sort, ...sorts] : sorts;
    }

    /**
     * Generates request parameters in a format compatible with Spring Boot.
     * @returns An object with parameters { page, size, sort }
     */
    toParams(): Record<string, string | undefined> {
        return {
            page: this._page.toString(),
            size: this._size.toString(),
            sort: this._sorts.length > 0 ? this._sorts.map(this.formatSort).join(",") : undefined,
        };
    }

    get page(): number {
        return this._page;
    }

    get size(): number {
        return this._size;
    }

    get sorts(): Sort[] | undefined {
        return this._sorts.length > 0 ? this._sorts : undefined;
    }

    /**
     * Adds a new sorting rule.
     * @param by Field to sort by
     * @param order Sort direction
     * @returns Updated SpringPageable object
     */
    addSort(by: SortBy, order: SortOrder): this {
        this._sorts.push({by, order});
        return this;
    }

    /**
     * Sets the page number.
     * @param page Page number
     * @returns The updated SpringPageable object
     */
    setPage(page: number): this {
        this._page = Math.max(0, page);
        return this;
    }

    /**
     * Sets the page size.
     * @param size The page size
     * @returns The updated SpringPageable object
     */
    setSize(size: number): this {
        this._size = Math.max(1, size);
        return this;
    }

    /**
     * Clears all sorting rules.
     * @returns The updated Spring Pageable object
     */
    clearSorts(): this {
        this._sorts = [];
        return this;
    }

    private formatSort({by, order}: Sort): string {
        return `${by},${order.toLowerCase()}`;
    }
}
