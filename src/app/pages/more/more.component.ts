import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { GithubFile } from '@model/types/github-file';
import { Interest } from '@model/types/interest';
import { Language } from '@model/types/language';

@Component({
    selector: 'app-more',
    imports: [CommonModule, TranslatePipe],
    templateUrl: './more.component.html',
    styleUrl: './more.component.scss'
})
export class MoreComponent implements OnInit {
  private readonly translations = {
    en: {
      today: 'today',
      yesterday: 'yesterday',
      days: (days: number) => `${Math.floor(days)} days ago`,
      month: '1 month ago',
      months: (months: number) => `${Math.floor(months)} months ago`,
      year: '1 year ago',
      years: (years: number) => `${Math.floor(years)} years ago`
    },
    fr: {
      today: "aujourd'hui",
      yesterday: 'hier',
      days: (days: number) => `${Math.floor(days)} jours`,
      month: 'il y a 1 mois',
      months: (months: number) => `il y a ${Math.floor(months)} mois`,
      year: 'il y a 1 an',
      years: (years: number) => `il y a ${Math.floor(years)} ans`
    }
  };
  files: GithubFile[] = [
    {
      nameKey: 'more.resumes.french',
      path: 'assets/pdf/tanguy_hardion_cv.pdf',
      lastCommitDate: '',
      image: 'flags/france.png'
    },
    {
      nameKey: 'more.resumes.english',
      path: 'assets/pdf/tanguy_hardion_resume.pdf',
      lastCommitDate: '',
      image: 'flags/europe.png'
    },
    {
      nameKey: 'more.resumes.us',
      path: 'assets/pdf/tanguy_hardion_us_resume.pdf',
      lastCommitDate: '',
      image: 'flags/us.png'
    }
  ];
  languages: Language[] = [
    {
      nameKey: 'more.languages.french.name',
      levelKey: 'more.languages.french.level',
      image: 'flags/france-gradient.png'
    },
    {
      nameKey: 'more.languages.english.name',
      levelKey: 'more.languages.english.level',
      image: 'flags/us-gradient.png'
    },
    {
      nameKey: 'more.languages.spanish.name',
      levelKey: 'more.languages.spanish.level',
      image: 'flags/spain-gradient.png'
    }
  ];
  interests: Interest[] = [
    {
      nameKey: 'more.interests.watchmaking',
      image: 'illustrations/watch.png'
    },
    {
      nameKey: 'more.interests.sports',
      image: 'illustrations/gym.jpg'
    },
    {
      nameKey: 'more.interests.music',
      image: 'illustrations/piano.jpg'
    }
  ];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.updateFileCommitDates();

    this.translateService.onLangChange.subscribe(() => {
      this.updateFileCommitDates();
    });
  }

  private updateFileCommitDates() {
    this.files.forEach(async (file) => {
      const storedData = localStorage.getItem(file.path);

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (!this.isStale(parsedData.timestamp)) {
          // if data is fresh, use it
          file.lastCommitDate = this.getDuration(new Date(parsedData.lastCommitDate));
        } else {
          // if data is stale, fetch the commit date and store it
          await this.fetchAndStoreData(file, file.path);
        }
      } else {
        // no data, fetch and store it
        await this.fetchAndStoreData(file, file.path);
      }
    });
  }

  getImagePath(image: string): string {
    return `url(assets/images/${image})`;
  }

  async fetchAndStoreData(file: GithubFile, path: string) {
    const lastCommitDate = await this.getLastCommitDate(path);

    if (lastCommitDate) {
      file.lastCommitDate = this.getDuration(lastCommitDate);
      localStorage.setItem(
        path,
        JSON.stringify({ lastCommitDate: lastCommitDate.toISOString(), timestamp: Date.now() }) // modified: store as ISO string
      );
    }
  }

  async getLastCommitDate(filePath: string): Promise<Date | null> {
    const username = 'tanguyhardion';
    const repo = 'tanguyhardion.github.io';
    const url = `https://api.github.com/repos/${username}/${repo}/commits?path=src/${filePath}`;

    try {
      const response = await fetch(url);
      const commits = await response.json();
      if (commits.length > 0) {
        const lastCommitDate = new Date(commits[0].commit.author.date);
        return lastCommitDate;
      }
      return null;
    } catch (error) {
      console.error('Error fetching commit date:', error);
      return null;
    }
  }

  getDuration(date: Date): string {
    const now = new Date();
    const duration = now.getTime() - date.getTime();
    const days = duration / (1000 * 60 * 60 * 24);
    return this.formatDuration(days, this.translateService.currentLang as 'en' | 'fr');
  }

  private formatDuration(days: number, lang: 'en' | 'fr'): string {
    const translation = this.translations[lang];
    if (days < 1) {
      return translation.today;
    } else if (days < 2) {
      return translation.yesterday;
    } else if (days < 30) {
      return translation.days(days);
    } else {
      const months = days / 30;
      if (months < 12) {
        return months < 2 ? translation.month : translation.months(months);
      } else {
        const years = months / 12;
        return years < 2 ? translation.year : translation.years(years);
      }
    }
  }

  isStale(timestamp: number) {
    const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
    const now = Date.now();
    return now - timestamp > oneDay;
  }
}
