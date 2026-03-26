import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../../../tests/mocks/router-dom.mock';
import BaseLayout from './base-layout';
import { render, screen } from '@testing-library/react';

vi.mock("../header/header", () => ({
  default: () => <header data-testid="mock-header">Header</header>,
}));

vi.mock("../footer/footer", () => ({
  default: () => <footer data-testid="mock-footer">Footer</footer>,
}));

describe(BaseLayout.name, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar Header, Footer e Outlet", () => {
    render(<BaseLayout />);
    
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
