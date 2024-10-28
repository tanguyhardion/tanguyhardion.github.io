import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { GithubFile } from '@model/types/github-file';
import { Interest } from '@model/types/interest';

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more.component.html',
  styleUrl: './more.component.scss'
})
export class MoreComponent implements OnInit {
  files: GithubFile[] = [
    {
      name: 'EU format, in French',
      path: 'assets/pdf/tanguy_hardion_cv.pdf',
      lastCommitDate: '',
      image: 'france.png'
    },
    {
      name: 'EU format, in English',
      path: 'assets/pdf/tanguy_hardion_resume.pdf',
      lastCommitDate: '',
      image: 'europe.png'
    },
    {
      name: 'US format',
      path: 'assets/pdf/tanguy_hardion_us_resume.pdf',
      lastCommitDate: '',
      image: 'us.png'
    }
  ];
  interests: Interest[] = [
    {
      name: 'Watchmaking',
      image: 'watch.jpg'
    },
    {
      name: 'Sports',
      image: 'gym.jpg'
    },
    {
      name: 'Music',
      image: 'piano.jpg'
    }
  ];

  ngOnInit(): void {
    this.files.forEach(async (file) => {
      const storedData = localStorage.getItem(file.path);

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (!this.isStale(parsedData.timestamp)) {
          // if data is fresh, use it
          file.lastCommitDate = parsedData.lastCommitDate;
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

  getLinkImage(image: string): string {
    return `url(assets/flags/${image})`;
  }

  getInterestImage(image: string): string {
    return `url(assets/illustrations/${image})`;
  }

  async fetchAndStoreData(file: GithubFile, path: string) {
    const lastCommitDate = await this.getLastCommitDate(path);
    if (lastCommitDate) {
      file.lastCommitDate = lastCommitDate;
      localStorage.setItem(path, JSON.stringify({ lastCommitDate, timestamp: Date.now() }));
    }
  }

  async getLastCommitDate(filePath: string): Promise<string | null> {
    const username = 'tanguyhardion';
    const repo = 'tanguyhardion.github.io';
    const url = `https://api.github.com/repos/${username}/${repo}/commits?path=src/${filePath}`;

    try {
      const response = await fetch(url);
      const commits = await response.json();
      if (commits.length > 0) {
        const lastCommitDate = commits[0].commit.author.date;
        return this.getDuration(new Date(lastCommitDate));
      }
      return null;
    } catch (error) {
      console.error('Error fetching commit date:', error);
      return null;
    }
  }

  getDuration(date: Date) {
    // return day, month, or year depending on the duration
    // if 0 then return 'today'
    const now = new Date();
    const duration = now.getTime() - date.getTime();
    const seconds = duration / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = days / 365;

    if (days < 30) {
      return days < 1 ? 'today' : days < 2 ? 'yesterday' : `${Math.floor(days)} days ago`;
    } else if (months < 12) {
      return `${Math.floor(months)} months ago`;
    } else {
      return `${Math.floor(years)} years ago`;
    }
  }

  isStale(timestamp: number) {
    const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
    const now = Date.now();
    return now - timestamp > oneDay;
  }
}
