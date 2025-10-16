export function getHeaderStyle(pathname: string, isMobile: boolean) {
  return {
    paddingRight: pathname === "/" ? (isMobile ? "12px" : "32px") : "",
  };
}
