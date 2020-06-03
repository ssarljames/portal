import { OnInit, OnDestroy } from '@angular/core';
import { StateService } from '../services/state/state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponseMeta, UrlQueryParams } from '../services/resource/resource.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export abstract class ComponentDataFiltering implements OnInit, OnDestroy{

    /**
     * Property to modify when this component process an asyn procedure
     */
    loading: boolean = false;

    private _meta: HttpResponseMeta = {
        current_page: 1,
        per_page: 15
    };


    private _queryParams: UrlQueryParams = {
        q: '',
        page: 1,
        per_page: 15
    }
    
    /**
     * FormControl that called `onSearchChange(q: string)` method on value change.
     */
    search: FormControl = new FormControl('');

    constructor(private componentName: string,
                private _stateService: StateService, 
                private _activatedRoute: ActivatedRoute,
                private _router: Router){

    }



    ngOnInit(): void {
        this.fillMeta();
        this.fillQueryParams();


        this.search.valueChanges.pipe(
            debounceTime(300)
        ).subscribe( q => {
            this._queryParams.q = q;
            this._queryParams.page = 1;
            this.updateUrlQueryParams();
            this.onResourceFetch();
        });

        this.updateUrlQueryParams();

        this.init();
    }

    ngOnDestroy(): void {
        this.setState('queryParams', this._queryParams);
        this.setState('meta', this._meta);
        this.destroy();
    }

    fillMeta(): void { 
        this._meta = this.getState('meta', this._meta);
    }

    fillQueryParams(): void {
        this._queryParams = this.getState('queryParams', this._queryParams);

        const qp = this._activatedRoute.queryParams;
        
        for (const key in this._queryParams) {
            if (qp.hasOwnProperty(key)) {
                this._queryParams[key] = qp[key];
            }
        }        


        this.search.setValue( this._queryParams.q );

        console.log(this.queryParams);
        
    }

    /**
     * Set a property to persist in this Angular Component using `StateService`
     * @param name 
     * @param value 
     */
    setState(name: string, value: any): void {
        this._stateService.set(`${this.componentName}.${name}`, value); 
    }

    /**
     * Get a property value from `StateService`
     * @param name 
     * @param value 
     */
    getState(name: string, defaultValue: any = null): any {
        return this._stateService.get(`${this.componentName}.${name}`) ?? defaultValue; 
    }

    /**
     * This method updates the url query parameters on the current route
     */
    updateUrlQueryParams(): void {
        this._router.navigate([ location.pathname ], {
            queryParams: this._queryParams,
            queryParamsHandling: 'merge'
        });
    }

    /**
     * Set `page` and `per_page` property of `queryParams`
     * @param page 
     * @param per_page 
     */
    setPageInfo(page: number, per_page: number): void {
        this._queryParams.page = page;
        this._queryParams.per_page = per_page;
    }

    setSortInfo(sort: string, direction: string|'asc'|'desc' = 'asc'): void {
        this.queryParams.sort_by = sort;
        this.queryParams.sort_dir = direction;
    }

    /**
     * Set the meta of this component
     * @param meta 
     */
    setMeta(meta: HttpResponseMeta): void {
        this._meta = meta;
    }

    /**
     * Get the meta of this component
     */
    get meta(): HttpResponseMeta {
        return this._meta;
    }

    /**
     * Get the query parameters of this component
     */
    get queryParams(): UrlQueryParams {
        return this._queryParams;
    }

    /**
     * Invoke this to update page info and call `onResourceFetch()`
     * @param page 
     */
    onPageChange(page: PageEvent): void {
        this.setPageInfo(page.pageIndex + 1, page.pageSize);
        this.updateUrlQueryParams();
        this.onResourceFetch();
    }

    /**
     * Invoke this to update sort procedure and call `onResourceFetch()`
     */
    onSort(sort: Sort): void {
        this.setSortInfo(sort.active, sort.direction)
        this.updateUrlQueryParams();
        this.onResourceFetch();
    }

    /**
     *  This method is called after the `ngOnInit()` of this Angular Component.
     */
    abstract init(): void;

    /**
     *  This method is called after the `ngDestroyInit()` of this Angular Component.
     */
    abstract destroy(): void;

    /**
     * Method that is called when page changes or search
     */
    abstract onResourceFetch(): void;

}