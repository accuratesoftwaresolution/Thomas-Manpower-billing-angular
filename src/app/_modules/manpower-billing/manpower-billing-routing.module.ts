import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyMasterComponent } from './agency-master/agency-master.component';
import { VisaQuotaDesignationMasterComponent } from './visa-quota-designation-master/visa-quota-designation-master.component';
import { NationlityMasterComponent } from './nationlity-master/nationlity-master.component';
import { VisaTypeMasterComponent } from './visa-type-master/visa-type-master.component';
import { EmployeeSelectionCriteriaMasterComponent } from './employee-selection-criteria-master/employee-selection-criteria-master.component';
import { CustomerSiteCreationMasterComponent } from './customer-site-creation-master/customer-site-creation-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { OffterLetterIssuedMasterComponent } from './offter-letter-issued-master/offter-letter-issued-master.component';
import { SignedOfferLetterMasterComponent } from './signed-offer-letter-master/signed-offer-letter-master.component';
import { VisaRequestMasterComponent } from './visa-request-master/visa-request-master.component';
import { VisaAppliedStatusMasterComponent } from './visa-applied-status-master/visa-applied-status-master.component';
import { QvcMasterComponent } from './qvc-master/qvc-master.component';
import { CriteriaMasterComponent } from './criteria-master/criteria-master.component';
import { QatarIdMasterComponent } from './qatar-id-master/qatar-id-master.component';
import { GpExpMasterComponent } from './gp-exp-master/gp-exp-master.component';
import { CreatorMasterComponent } from './creator-master/creator-master.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { JobCreationMasterComponent } from './job-creation-master/job-creation-master.component';
import { SiteExecutiveMasterComponent } from './site-executive-master/site-executive-master.component';
import { ClientDesignationMasterComponent } from './client-designation-master/client-designation-master.component';
import { OurContactDesignationMasterComponent } from './our-contact-designation-master/our-contact-designation-master.component';
import { LabourCampMasterComponent } from './labour-camp-master/labour-camp-master.component';
import { ProjectCompanyMasterComponent } from './project-company-master/project-company-master.component';
import { PpexpMasterComponent } from './ppexp-master/ppexp-master.component';
import { ClientMasterComponent } from './client-master/client-master.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { VisaStatusMasterComponent } from './visa-status-master/visa-status-master.component';
import { GpLocationComponent } from './gp-location-master/gp-location.component';
import { GateNumberMasterComponent } from './gate-number-master/gate-number-master.component';
import { CustomerJobSiteCreationComponent } from './customer-job-site-creation/customer-job-site-creation.component';
import { BillingRateMasterComponent } from './billing-rate-master/billing-rate-master.component';
import { MonthlyCalenderMasterComponent } from './monthly-calender-master/monthly-calender-master.component';
import { LabourCampManagementComponent } from './labour-camp-management/labour-camp-management.component';
import { CompanyViseVisaquotaAdditionaldetailsComponent } from './company-vise-visaquota-additionaldetails/company-vise-visaquota-additionaldetails.component';
import { CompanyLevelVisaquotaDeletionDetailsComponent } from './company-level-visaquota-deletion-details/company-level-visaquota-deletion-details.component';
import { EmployeeSelectionAgenciesComponent } from './employee-selection-agencies/employee-selection-agencies.component';
import { GatePassOthersComponent } from './gate-pass-others/gate-pass-others.component';
import { EmployeeInRegisterComponent } from './employee-in-register/employee-in-register.component';
import { EmployeeOutRegisterComponent } from './employee-out-register/employee-out-register.component';
import { EmployeeReserveRegisterComponent } from './employee-reserve-register/employee-reserve-register.component';
import { EmployeeReleaseRegisterComponent } from './employee-release-register/employee-release-register.component';
import { EmployeeBatchComponent } from './employee-batch/employee-batch.component';
import { EmployeeMobilizationComponent } from './employee-mobilization/employee-mobilization.component';
import { EmployeeBatchMobilizationComponent } from './employee-batch-mobilization/employee-batch-mobilization.component';
import { EmployeeDemobilizationComponent } from './employee-demobilization/employee-demobilization.component';
import { EmployeeBatchDemobilizationComponent } from './employee-batch-demobilization/employee-batch-demobilization.component';
import { TimeRecordingTransactionComponent } from './time-recording-transaction/time-recording-transaction.component';
import { EmployeeAttendanceSummaryReportComponent } from './employee-attendance-summary-report/employee-attendance-summary-report.component';
import { LabourCampEmployeeInRegisterComponent } from './labour-camp-employee-in-register/labour-camp-employee-in-register.component';
import { LabourCampEmployeeOutRegisterComponent } from './labour-camp-employee-out-register/labour-camp-employee-out-register.component';
import { LabourCampDailyAttendanceComponent } from './labour-camp-daily-attendance/labour-camp-daily-attendance.component';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { ProjectEmployeeMobilizationComponent } from './project-employee-mobilization/project-employee-mobilization.component';
import { VehicleMobilizationComponent } from './vehicle-mobilization/vehicle-mobilization.component';
import { EquipmentMobilizationComponent } from './equipment-mobilization/equipment-mobilization.component';
import { ProjectEmployeeDemobilizationComponent } from './project-employee-demobilization/project-employee-demobilization.component';
import { VehicleDemobilizationComponent } from './vehicle-demobilization/vehicle-demobilization.component';
import { EquipmentDemobilizationComponent } from './equipment-demobilization/equipment-demobilization.component';
import { PaymentAndPdcPaymentComponent } from './payment-and-pdc-payment/payment-and-pdc-payment.component';
import { EmployeeModuleMasterComponent } from './employee-module-master/employee-module-master.component';
import { LeaveTypeMasterComponent } from './leave-type-master/leave-type-master.component';
import { GpMasterComponent } from './gp-master/gp-master.component';
const routes: Routes = [
  { path: 'agency-master', component: AgencyMasterComponent },
  { path: 'agency-master/:id', component: AgencyMasterComponent },

  { path: 'visa-quota-designation-master', component: VisaQuotaDesignationMasterComponent },
  { path: 'visa-quota-designation-master/:id', component: VisaQuotaDesignationMasterComponent },

  { path: 'nationality-master', component: NationlityMasterComponent },
  { path: 'nationality-master/:id', component: NationlityMasterComponent },

  { path: 'visa-type-master', component: VisaTypeMasterComponent },
  { path: 'visa-type-master/:id', component: VisaTypeMasterComponent },

  { path: 'employee-selection-criteria-master', component: EmployeeSelectionCriteriaMasterComponent },
  { path: 'employee-selection-criteria-master/:id', component: EmployeeSelectionCriteriaMasterComponent },

  { path: 'customer-site-creation-master', component: CustomerSiteCreationMasterComponent },
  { path: 'customer-site-creation-master/:id', component: CustomerSiteCreationMasterComponent },

  { path: 'designation-master', component: DesignationMasterComponent },
  { path: 'designation-master/:id', component: DesignationMasterComponent },

  { path: 'offer-letter-issued', component: OffterLetterIssuedMasterComponent },
  { path: 'offer-letter-issued/:id', component: OffterLetterIssuedMasterComponent },

  { path: 'signed-offer-letter', component: SignedOfferLetterMasterComponent },
  { path: 'signed-offer-letter/:id', component: SignedOfferLetterMasterComponent },

  { path: 'visa-request-status', component: VisaRequestMasterComponent },
  { path: 'visa-request-status/:id', component: VisaRequestMasterComponent },

  { path: 'visa-applied-status', component: VisaAppliedStatusMasterComponent },
  { path: 'visa-applied-status/:id', component: VisaAppliedStatusMasterComponent },

  { path: 'qvc-status-master', component: QvcMasterComponent },
  { path: 'qvc-status-master/:id', component: QvcMasterComponent },

  { path: 'criteria-master', component: CriteriaMasterComponent },
  { path: 'criteria-master/:id', component: CriteriaMasterComponent },

  { path: 'qatar-id-master', component: QatarIdMasterComponent },
  { path: 'qatar-id-master/:id', component: QatarIdMasterComponent },

  { path: 'gp-exp-master', component: GpExpMasterComponent },
  { path: 'gp-exp-master/:id', component: GpExpMasterComponent },

  { path: 'creator-master', component: CreatorMasterComponent },
  { path: 'creator-master/:id', component: CreatorMasterComponent },

  { path: 'location-master', component: LocationMasterComponent },
  { path: 'location-master/:id', component: LocationMasterComponent },

  { path: 'job-creation-master', component: JobCreationMasterComponent },
  { path: 'job-creation-master/:id', component: JobCreationMasterComponent },

  { path: 'site-executive-master', component: SiteExecutiveMasterComponent },
  { path: 'site-executive-master/:id', component: SiteExecutiveMasterComponent },


  { path: 'client-designation-master', component: ClientDesignationMasterComponent },
  { path: 'client-designation-master/:id', component: ClientDesignationMasterComponent },

  { path: 'our-contact-deisgnation-master', component: OurContactDesignationMasterComponent },
  { path: 'our-contact-deisgnation-master/:id', component: OurContactDesignationMasterComponent },

  { path: 'labour-camp-master', component: LabourCampMasterComponent },
  { path: 'labour-camp-master/:id', component: LabourCampMasterComponent },

  { path: 'project-company-master', component: ProjectCompanyMasterComponent },
  { path: 'project-company-master/:id', component: ProjectCompanyMasterComponent },

  { path: 'ppexp-master', component: PpexpMasterComponent },
  { path: 'ppexp-master/:id', component: PpexpMasterComponent },

  { path: 'client-master', component: ClientMasterComponent },
  { path: 'client-master/:id', component: ClientMasterComponent },

  { path: 'project-master', component: ProjectMasterComponent },
  { path: 'project-master/:id', component: ProjectMasterComponent },

  { path: 'visa-status-master', component: VisaStatusMasterComponent },
  { path: 'visa-status-master/:id', component: VisaStatusMasterComponent },

  { path: 'gp-location-master', component: GpLocationComponent },
  { path: 'gp-location-master/:id', component: GpLocationComponent },

  { path: 'gate-number-master', component: GateNumberMasterComponent },
  { path: 'gate-number-master/:id', component: GateNumberMasterComponent },

  { path: 'customer-job-site-creation', component: CustomerJobSiteCreationComponent },
  { path: 'customer-job-site-creation/:id', component: CustomerJobSiteCreationComponent },

  { path: 'billing-rate-master', component: BillingRateMasterComponent },
  { path: 'billing-rate-master/:id', component: BillingRateMasterComponent },

  { path: 'monthly-calender', component: MonthlyCalenderMasterComponent },
  { path: 'monthly-calender/:id', component: MonthlyCalenderMasterComponent },

  { path: 'labour-camp-management', component: LabourCampManagementComponent },
  { path: 'labour-camp-management/:id', component: LabourCampManagementComponent },

  { path: 'company-level-visaquota-additional-details', component: CompanyViseVisaquotaAdditionaldetailsComponent },
  { path: 'company-level-visaquota-additional-details/:id', component: CompanyViseVisaquotaAdditionaldetailsComponent },

  { path: 'company-level-visaquota-deletion-details', component: CompanyLevelVisaquotaDeletionDetailsComponent },
  { path: 'company-level-visaquota-deletion-details/:id', component: CompanyLevelVisaquotaDeletionDetailsComponent },

  { path: 'employee-selection-agencies', component: EmployeeSelectionAgenciesComponent },
  { path: 'employee-selection-agencies/:id', component: EmployeeSelectionAgenciesComponent },

  { path: 'gate-pass-others', component: GatePassOthersComponent },
  { path: 'gate-pass-others/:id', component: GatePassOthersComponent },

  { path: 'employee-in-register', component: EmployeeInRegisterComponent },
  { path: 'employee-in-register/:id', component: EmployeeInRegisterComponent },

  { path: 'employee-out-register', component: EmployeeOutRegisterComponent },
  { path: 'employee-out-register/:id', component: EmployeeOutRegisterComponent },

  { path: 'employee-reserve-register', component: EmployeeReserveRegisterComponent },
  { path: 'employee-reserve-register/:id', component: EmployeeReserveRegisterComponent },

  { path: 'employee-release-register', component: EmployeeReleaseRegisterComponent },
  { path: 'employee-release-register/:id', component: EmployeeReleaseRegisterComponent },

  { path: 'employee-batch', component: EmployeeBatchComponent },
  { path: 'employee-batch/:id', component: EmployeeBatchComponent },

  { path: 'employee-mobilization', component: EmployeeMobilizationComponent },
  { path: 'employee-mobilization/:id', component: EmployeeMobilizationComponent },

  { path: 'employee-batch-mobilization', component: EmployeeBatchMobilizationComponent },
  { path: 'employee-batch-mobilization/:id', component: EmployeeBatchMobilizationComponent },

  { path: 'employee-demobilization', component: EmployeeDemobilizationComponent },
  { path: 'employee-demobilization/:id', component: EmployeeDemobilizationComponent },

  { path: 'employee-batch-demobilization', component: EmployeeBatchDemobilizationComponent },
  { path: 'employee-batch-demobilization/:id', component: EmployeeBatchDemobilizationComponent },

  { path: 'time-recording-transaction', component: TimeRecordingTransactionComponent },
  { path: 'time-recording-transaction/:id', component: TimeRecordingTransactionComponent },


  { path: 'employee-attendance-summary-checking', component: EmployeeAttendanceSummaryReportComponent },
  { path: 'employee-attendance-summary-checking/:id', component: EmployeeAttendanceSummaryReportComponent },


  { path: 'labour-camp-employee-in-register', component: LabourCampEmployeeInRegisterComponent },
  { path: 'labour-camp-employee-in-register/:id', component: LabourCampEmployeeInRegisterComponent },


  { path: 'labour-camp-employee-out-register', component: LabourCampEmployeeOutRegisterComponent },
  { path: 'labour-camp-employee-out-register/:id', component: LabourCampEmployeeOutRegisterComponent },

  { path: 'labour-camp-daily-attendance', component: LabourCampDailyAttendanceComponent },
  { path: 'labour-camp-daily-attendance/:id', component: LabourCampDailyAttendanceComponent },

  { path: 'create-new-project', component: CreateNewProjectComponent },
  { path: 'create-new-project/:id', component: CreateNewProjectComponent },

  { path: 'project-employee-mobilization', component: ProjectEmployeeMobilizationComponent },
  { path: 'project-employee-mobilization/:id', component: ProjectEmployeeMobilizationComponent },

  { path: 'vehicle-mobilization', component: VehicleMobilizationComponent },
  { path: 'vehicle-mobilization/:id', component: VehicleMobilizationComponent },

  { path: 'equipment-mobilization', component: EquipmentMobilizationComponent },
  { path: 'equipment-mobilization/:id', component: EquipmentMobilizationComponent },

  { path: 'project-employee-demobilization', component: ProjectEmployeeDemobilizationComponent },
  { path: 'project-employee-demobilization/:id', component: ProjectEmployeeDemobilizationComponent },

  { path: 'equipment-demobilization', component: EquipmentDemobilizationComponent },
  { path: 'equipment-demobilization/:id', component: EquipmentDemobilizationComponent },


  { path: 'payment-and-pdc-payment', component: PaymentAndPdcPaymentComponent },
  { path: 'payment-and-pdc-payment/:id', component: PaymentAndPdcPaymentComponent },

  { path: 'employee-module-master', component: EmployeeModuleMasterComponent },
  { path: 'employee-module-master/:id', component: EmployeeModuleMasterComponent },

  { path: 'leave-type-master', component: LeaveTypeMasterComponent },
  { path: 'leave-type-master/:id', component: LeaveTypeMasterComponent },

    { path: 'GP-master', component: GpMasterComponent},
  { path: 'GP-master/:id', component: GpMasterComponent },















































];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManpowerBillingRoutingModule {

}
