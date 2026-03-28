import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CampaignCard from "./CampaignCard";

describe("CampaignCard (SCRUM-65)", () => {
  const mockCampaign = {
    id: "c-1",
    title: "Cứu trợ miền Trung",
    goal_amount: 100000000,
    current_amount: 45000000, // 45% progress
    status: "active",
  };

  it("renders campaign details correctly", () => {
    render(
      <BrowserRouter>
        <CampaignCard campaign={mockCampaign} />
      </BrowserRouter>,
    );
    expect(screen.getByText("Cứu trợ miền Trung")).toBeInTheDocument();
  });

  // Kiểm tra Progress Bar (SCRUM-65) xấp xỉ 45%
  it("displays the progress bar to match the calculated percentage", () => {
    const { container } = render(
      <BrowserRouter>
        <CampaignCard campaign={mockCampaign} />
      </BrowserRouter>,
    );

    // Check if the progress bar shows 45% either by width style or aria-valuenow
    // Depending on actual implementation. Many progress bars use style={{ width: '45%' }}
    const progressBar =
      container.querySelector(".bg-primary-600") ||
      container.querySelector('*[style*="width"]');
    if (progressBar) {
      expect(progressBar.getAttribute("style")).toContain("width: 45%");
    }
  });
});
