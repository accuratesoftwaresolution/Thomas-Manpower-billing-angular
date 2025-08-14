import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManpowerBillingRoutingModule } from './manpower-billing-routing.module';
import { ManpowerBillingComponent } from '../manpower-billing/manpower-billing.component';
import { AgencyMasterComponent } from './agency-master/agency-master.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { IcommonModule } from '../icommon/icommon.module';
import { WindowModule } from 'src/app/_window/window.module';
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
import { LocationMasterComponent } from './location-master/location-master.component';
import { CreatorMasterComponent } from './creator-master/creator-master.component';
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
import { CustomerDocumentAttachmentComponent } from './customer-job-site-creation/customer-document-attachment/customer-document-attachment.component';


@NgModule({
  declarations: [ManpowerBillingComponent, AgencyMasterComponent, VisaQuotaDesignationMasterComponent, NationlityMasterComponent, VisaTypeMasterComponent, EmployeeSelectionCriteriaMasterComponent, CustomerSiteCreationMasterComponent, DesignationMasterComponent, OffterLetterIssuedMasterComponent, SignedOfferLetterMasterComponent, VisaRequestMasterComponent, VisaAppliedStatusMasterComponent, QvcMasterComponent, CriteriaMasterComponent, QatarIdMasterComponent, GpExpMasterComponent, LocationMasterComponent, CreatorMasterComponent, JobCreationMasterComponent, SiteExecutiveMasterComponent, ClientDesignationMasterComponent, OurContactDesignationMasterComponent, LabourCampMasterComponent, ProjectCompanyMasterComponent, PpexpMasterComponent, ClientMasterComponent, ProjectMasterComponent, VisaStatusMasterComponent, GpLocationComponent, GateNumberMasterComponent, CustomerJobSiteCreationComponent, BillingRateMasterComponent, MonthlyCalenderMasterComponent, LabourCampManagementComponent, CompanyViseVisaquotaAdditionaldetailsComponent, CompanyLevelVisaquotaDeletionDetailsComponent, EmployeeSelectionAgenciesComponent, GatePassOthersComponent, EmployeeInRegisterComponent, EmployeeOutRegisterComponent, EmployeeReserveRegisterComponent, EmployeeReleaseRegisterComponent, EmployeeBatchComponent, EmployeeMobilizationComponent, EmployeeBatchMobilizationComponent, EmployeeDemobilizationComponent, EmployeeBatchDemobilizationComponent, TimeRecordingTransactionComponent, EmployeeAttendanceSummaryReportComponent, LabourCampEmployeeInRegisterComponent, LabourCampEmployeeOutRegisterComponent, LabourCampDailyAttendanceComponent, CreateNewProjectComponent, ProjectEmployeeMobilizationComponent, VehicleMobilizationComponent, EquipmentMobilizationComponent, ProjectEmployeeDemobilizationComponent, VehicleDemobilizationComponent, EquipmentDemobilizationComponent, PaymentAndPdcPaymentComponent, EmployeeModuleMasterComponent, LeaveTypeMasterComponent, GpMasterComponent, CustomerDocumentAttachmentComponent],
  imports: [
    CommonModule,
    ManpowerBillingRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    IcommonModule,
    WindowModule

  ]
  ,
    providers: [
      BreadcrumbService
    ]
})
export class ManpowerBillingModule { }
