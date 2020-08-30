import React from "react";

export default class ErrorBoundary extends React.Component<any, any> {

   state = {error: null, errorInfo: null};

   componentDidCatch(error: Error) {
      // Catch errors in any components below and re-render with error message
      this.setState({
         error: error
      })
      // You can also log error messages to an error reporting service here
   }

   render() {
      const {children} = this.props
      return (
         {children}
      )
   }
}