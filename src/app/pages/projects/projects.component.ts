import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCardComponent } from '@components/project-card/project-card.component';
import { ProjectContext } from '@model/enums/project-context';
import { Project } from '@model/interfaces/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projectList: Project[] = [
    {
      title: 'Machine Learning Challenge',
      description: `Analysis of two simulated datasets (classification and regression) and a real-world dataset.
      Goal: apply machine learning methods, evaluate model performance with error metrics and submit the best models to a leaderboard.
      The real-world dataset is sourced from platforms like Kaggle or UCI.`,
      duration: 'Ongoing',
      team: 3,
      technologies: ['R (FNN, caret, XGBoost, randomForest, etc.)'],
      context: ProjectContext.School,
      contextLogo: 'utc.png',
      image: 'ml.jpg',
    },
    {
      title: 'Personal Website',
      description: `You're looking at it! I like to think of it as a digital resume, more personal and interactive
      than a traditional one or a LinkedIn profile (although you can find me there too). It's also more fun to make!`,
      duration: '30 hours',
      team: 1,
      technologies: ['Vue.js (Nuxt)', 'GitHub Pages'],
      context: ProjectContext.Personal,
      image: 'website.png',
      link: 'https://github.com/tanguyhardion/tanguyhardion.github.io',
    },
    {
      title: 'CPage Map',
      description: `A web application displaying an interactive map of CPage's customers: public health institutions in France.
      It shows relevant data loaded with ETL processes and lets CPage collaborators log satisfaction levels after interactions (calls, emails, visits).
      Institutions are marked with a weather code indicating their satisfaction, offering a quick visual of which need more attention.
      It also provides data analysis tools, such as graphs and word clouds of the satisfaction logs using an NLP model from HuggingFace.`,
      duration: '100 hours',
      team: 1,
      technologies: [
        'Angular',
        'SpringBoot',
        'Flask',
        'PostgreSQL',
        'HuggingFace',
      ],
      context: ProjectContext.Work,
      contextLogo: 'cpage.png',
      image: 'map.png',
    },
    {
      title: 'CNN on CIFAR-100',
      description: `Training of a convolutional neural network (CNN) from scratch to classify images of the CIFAR-100 dataset.
      Preprocessed and engineered the dataset by normalizing the images and converting them to TensorFlow datasets.
      Experimented with different architectures and hyperparameters to improve the model's accuracy.
      Finished by evaluating the model's performance using various metrics and visualizations.
      This project was part of a course on machine learning and deep learning using Python.`,
      duration: '30 hours',
      team: 1,
      context: ProjectContext.School,
      contextLogo: 'utt.png',
      technologies: ['TensorFlow', 'Keras', 'HuggingFace'],
      image: 'cnn.jpg',
      link: 'https://github.com/tanguyhardion/cifar100-cnn',
    },
    {
      title: 'Llama 2 fine-tuning',
      description: `Fine-tuning of the 7B-parameter large language model (LLM) Llama 2.
      Prepared a dataset to train the model on extracting specific text from PDF files.
      Tuned the hyperparameters to make the model as accurate as possible.
      Experimented with different architectures and hyperparameters to improve the model's accuracy.
      Tested the model on various PDF files and evaluated its performance.
      This project, part of my internship at CPage, was a proof of concept to demonstrate the purpose
      of modern AI models in the company's software solutions.`,
      duration: '50 hours',
      team: 1,
      context: ProjectContext.Work,
      contextLogo: 'cpage.png',
      technologies: ['PyTorch', 'HuggingFace', 'Meta AI'],
      image: 'llama2.jpg',
    },
    {
      title: 'Visualizer',
      description: `A web application featuring a dependencies graph to map software solutions and their respective versions,
      for better compatibility tracking. Each node represents a software version, and each edge a dependency between two versions.
      Also includes features to add/remove nodes, view logs, and check stats.`,
      duration: '150 hours',
      team: 1,
      context: ProjectContext.Work,
      contextLogo: 'cpage.png',
      technologies: ['Angular', 'SpringBoot', 'Oracle'],
      image: 'graph.png',
    },
  ];
}
