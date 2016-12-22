// app/services/auth.service.ts
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock('d0xGISxKVqS1jrxl59SQqH0upmOxImCO', 'dryoshi.eu.auth0.com', {});
    userProfile: any;
    constructor(private router: Router) {
        // Add callback for lock `authenticated` event
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;

                // Redirect if there is a saved url to do so.
                var redirectUrl: string = localStorage.getItem('redirect_url');
                if (redirectUrl != undefined) {
                    this.router.navigate([redirectUrl]);
                    localStorage.removeItem('redirect_url');
                }
            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    }

    public isAdmin() {
        return this.userProfile && this.userProfile.app_metadata
            && this.userProfile.app_metadata.roles
            && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
    }

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        this.router.navigate(['']);
    }
}