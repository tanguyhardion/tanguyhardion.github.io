import { ref } from 'vue';

export const useResumeDate = () => {
  const dates = ref<Record<string, string>>({});
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Default fallback dates if API rate limit or local demo
  const fallbackDates: Record<string, string> = {
    'public/resumes/Tanguy_Hardion_Resume_EN.pdf': 'July 2026',
    'public/resumes/Tanguy_Hardion_Resume_FR.pdf': 'July 2026',
    'public/resumes/Tanguy_Hardion_Resume_US_OnePage.pdf': 'July 2026'
  };

  const fetchResumeDate = async (repoFilePath: string, ownerRepo: string = 'tanguyhardion/tanguyhardion.github.io') => {
    if (dates.value[repoFilePath]) {
      return dates.value[repoFilePath];
    }

    try {
      loading.value = true;
      const url = `https://api.github.com/repos/${ownerRepo}/commits?path=${encodeURIComponent(repoFilePath)}&page=1&per_page=1`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!res.ok) {
        throw new Error(`GitHub API HTTP ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const commitDateRaw = data[0].commit?.committer?.date || data[0].commit?.author?.date;
        if (commitDateRaw) {
          const dateObj = new Date(commitDateRaw);
          const formatted = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          dates.value[repoFilePath] = formatted;
          return formatted;
        }
      }
      
      dates.value[repoFilePath] = fallbackDates[repoFilePath] || 'July 2026';
      return dates.value[repoFilePath];
    } catch (e: any) {
      console.warn(`Could not fetch GitHub commit date for ${repoFilePath}, using fallback.`, e);
      dates.value[repoFilePath] = fallbackDates[repoFilePath] || 'July 2026';
      return dates.value[repoFilePath];
    } finally {
      loading.value = false;
    }
  };

  return {
    dates,
    loading,
    error,
    fetchResumeDate
  };
};
