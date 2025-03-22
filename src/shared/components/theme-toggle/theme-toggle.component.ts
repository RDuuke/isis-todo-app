import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-theme-toggle',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './theme-toggle.component.html',
    styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
    darkMode = false;

    ngOnInit(): void {
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.applyTheme();
    }

    toggleDark(): void {
        this.applyTheme();
        localStorage.setItem('darkMode', String(this.darkMode));
    }

    private applyTheme() {
        document.body.classList.toggle('dark-mode', this.darkMode);
    }
}
