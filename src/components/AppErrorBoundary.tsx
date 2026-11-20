import React from 'react';
import { Language } from '../types';
import { ErrorDialogueView } from './ErrorDialogueView';

interface AppErrorBoundaryProps {
  language: Language;
  onNavigate: (view: string, sectorSlug?: string) => void;
  onOpenContactModal: (opts?: { sectorSlug?: string; engagementType?: string; subject?: string }) => void;
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('JIGSY INDIA view boundary caught error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDialogueView
          kind="runtime"
          language={this.props.language}
          onNavigate={(view, slug) => {
            this.setState({ hasError: false });
            this.props.onNavigate(view, slug);
          }}
          onOpenContactModal={(opts) => {
            this.setState({ hasError: false });
            this.props.onOpenContactModal(opts);
          }}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
