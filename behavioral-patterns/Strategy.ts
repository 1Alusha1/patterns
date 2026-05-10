interface CrawlStrategy {
    crawl(url: string): void
}

class PaginationStrategy implements CrawlStrategy {
    crawl(url: string): void {
        console.log(`[Pagination] Обходим страницы: ${url}`)
    }
}

class InfiniteScrollStrategy implements CrawlStrategy {
    crawl(url: string): void {
        console.log(`[Scroll] Скроллим и собираем: ${url}`)
    }
}

class ApiStrategy implements CrawlStrategy {
    crawl(url: string): void {
        console.log(`[API] Дёргаем эндпоинты: ${url}`)
    }
}

class Scraper {
    private strategy: CrawlStrategy | null = null

    setStrategy(strategy: CrawlStrategy) {
        this.strategy = strategy
    }

    run(url: string) {
        if (this.strategy) this.strategy.crawl(url)
    }
}

const scraper = new Scraper()

scraper.setStrategy(new PaginationStrategy())
scraper.run('site-a.com')
// [Pagination] Обходим страницы: site-a.com

scraper.setStrategy(new InfiniteScrollStrategy())
scraper.run('site-b.com')
// [Scroll] Скроллим и собираем: site-b.com

scraper.setStrategy(new ApiStrategy())
scraper.run('site-c.com')
// [API] Дёргаем эндпоинты: site-c.com