import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage-service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            // this.isAuthenticated = !user ? false : true; 
            // below is the same logic as abave
            this.isAuthenticated = !!user;
        });
    }

    onLogout() {
        this.authService.logout();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe
    }
}