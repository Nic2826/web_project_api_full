import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar un UI alternativo
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de monitoreo (opcional)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza una UI alternativa en caso de error
      return <h1>Oops! Something went wrong.</h1>;
    }

    // Renderiza los componentes hijos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
