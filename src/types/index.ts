export type Language = 'en' | 'hi' | 'mai';

export interface Sector {
  id: string;
  name: string;
  slug: string;
  code: string;
  motto: {
    en: string;
    hi: string;
    mai: string;
  };
  shortDescription: {
    en: string;
    hi: string;
    mai: string;
  };
  fullDescription: {
    en: string;
    hi: string;
    mai: string;
  };
  iconName: string;
  colorScheme: {
    badge: string;
    accent: string;
  };
  deliverables: {
    en: string;
    hi: string;
    mai: string;
  };
  coreOperations: {
    en: string[];
    hi: string[];
    mai: string[];
  };
  services: {
    title: { en: string; hi: string; mai: string };
    description: { en: string; hi: string; mai: string };
    icon: string;
  }[];
  featuredProjects: {
    title: { en: string; hi: string; mai: string };
    shortDescription: { en: string; hi: string; mai: string };
    details: { en: string[]; hi: string[]; mai: string[] };
    status: string;
  }[];
}

export interface InternshipTrack {
  id: string;
  trackCode: string;
  name: {
    en: string;
    hi: string;
    mai: string;
  };
  duration: {
    en: string;
    hi: string;
    mai: string;
  };
  originalPrice: number;
  discountedPrice: number;
  courseFee: number;
  miscFee: number;
  description: {
    en: string;
    hi: string;
    mai: string;
  };
  highlights: {
    en: string[];
    hi: string[];
    mai: string[];
  };
  deliverables: {
    en: string;
    hi: string;
    mai: string;
  };
}

export interface InternshipApplication {
  id: string;
  salutation?: string;
  fullName: string;
  fatherName?: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  branch: string;
  passingYear: string;
  trackId: string;
  trackTitle: string;
  courseFee: number;
  miscFee: number;
  totalAmount: number;
  paymentMethod: 'razorpay' | 'upi_manual';
  razorpayPaymentId?: string;
  utrNumber?: string;
  screenshotDataUrl?: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  termsAccepted: boolean;
  createdAt: string;
  verifiedAt?: string;
  offerLetterIssuedAt?: string;
  certificateIssuedAt?: string;
  certificateNumber?: string;
  notes?: string;
}

export interface CertificateRecord {
  certificateNumber: string;
  applicationId: string;
  salutation: string;
  candidateName: string;
  fatherName: string;
  college: string;
  degree: string;
  branch: string;
  trackTitle: string;
  duration: string;
  grade: string;
  issueDate: string;
  signatory1: string;
  signatory2: string;
}

export interface Job {
  id: string;
  title: string;
  sectorSlug: string;
  sectorName: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Remote';
  experience: string;
  salaryStipend: string;
  description: string;
  requirements: string[];
  postedAt: string;
  isActive: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  experienceYears: string;
  coverNote: string;
  submittedAt: string;
}

export interface ClientJobPosting {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  jobTitle: string;
  sectorSlug: string;
  jobType: string;
  location: string;
  stipendBudget: string;
  description: string;
  submittedAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface EmployeeRecord {
  employeeId: string;
  fullName: string;
  designation: string;
  department: string;
  joiningDate: string;
  status: 'Active' | 'Verified' | 'Probation';
  officialEmail: string;
}
