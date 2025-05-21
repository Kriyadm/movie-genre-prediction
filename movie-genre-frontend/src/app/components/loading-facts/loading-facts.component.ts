import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading-facts',
  templateUrl: './loading-facts.component.html',
  styleUrls: ['./loading-facts.component.scss']
})
export class LoadingFactsComponent implements OnInit, OnDestroy {
  facts: string[] = [
    'The first feature-length film ever made was "The Story of the Kelly Gang" (1906) from Australia.',
    'The Hollywood sign originally read "Hollywoodland".',
    'Walt Disney holds the record for most Academy Awards won by an individual (22 Oscars).',
    'The world\'s longest film is "Logistics" (2012), which runs for 857 hours (35 days and 17 hours).',
    'The most expensive movie ever made is "Pirates of the Caribbean: On Stranger Tides" (2011).',
    'The shortest performance to win an Oscar was Beatrice Straight in "Network" (1976) with just 5 minutes and 2 seconds of screen time.',
    '"Psycho" (1960) was the first American film to show a toilet flushing on screen.',
    'India produces the most films of any country in the world.',
    'The first CGI character in a feature film was the stained glass knight in "Young Sherlock Holmes" (1985).',
    '"Spirited Away" (2001) is the only non-English language film to win the Oscar for Best Animated Feature.'
  ];
  currentFact: string = '';
  private intervalId: any;

  ngOnInit() {
    this.showRandomFact();
    this.intervalId = setInterval(() => this.showRandomFact(), 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showRandomFact() {
    const randomIndex = Math.floor(Math.random() * this.facts.length);
    this.currentFact = this.facts[randomIndex];
  }
}
