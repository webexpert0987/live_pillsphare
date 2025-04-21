import React from "react";
import TrustBar from "../../pages/Trustbar";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <>
      {/************** TrustBar Section **************/}
      <TrustBar />
      {/************** Page Content **************/}
      <Box
        className="PrivacyContent"
        sx={{
          padding: { xs: "30px 0", sm: "50px 0", md: "80px 0" },
        }}
      >
        <Container>
          <Typography variant="h1">Privacy Policy</Typography>
          <Box>
            <Typography variant="h2">Introduction</Typography>
            <Typography className="privacyPara" variant="body1">
              At Pill Sphere LTD we are committed to safeguarding and preserving
              the privacy of our visitors. These 'key points' summarise some of
              the more important provisions in our privacy policy. We also
              recommend that you read the full privacy policy.
            </Typography>
            <Box>
              <Typography variant="h2">Information we collect</Typography>
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                When you visit our website, we automatically collect and save
                your IP address.
              </Typography>
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                Where you volunteer this information (i.e. by filling in an
                online form to use our services), we will also save your name,
                delivery address, email address, date of birth, telephone
                number, Doctor address, patient notes, consultation notes,
                payment records and details of the medicines you have ordered.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2">
                Use of your information We use Your Data:
              </Typography>
              <Typography variant="h2">We use Your Data:</Typography>
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                To provide our services to you (namely, medical consultations
                for prescription medications) and to comply with regulatory
                requirements.
              </Typography>
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                To send you details of our goods and services, or those of other
                companies within our group, but only if you give us permission
                to do so.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2">We share Your Data:</Typography>
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                With other third parties where this is necessary to deliver the
                services.
              </Typography>
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                With other business entities within the Shama Pharma group.
              </Typography>{" "}
              <Typography
                component="li"
                className="privacyPara"
                variant="body1"
              >
                With other third parties to send you details of their goods and
                services, but only if you give us permission to do so.
              </Typography>
            </Box>
            {/***********/}
            <Box>
              <Typography variant="h2"> Patient confidentiality:</Typography>
              <Typography className="privacyPara" variant="body1">
                Some of the information we collect is medical data. This
                information is always treated confidentially. We will never
                disclose medical data unless legally required or permitted to do
                so. It will not be used by us for marketing purposes unless you
                give us your express permission.
              </Typography>
            </Box>
            {/* ////// */}
            <Typography variant="h2">Privacy Policy - The Details</Typography>
            <Typography variant="h2">Introduction</Typography>
            {/****** li *****/}
            <Box>
              <Typography className="privacyPara" variant="body1">
                Pill Sphere LTD (registered number 16158942), whose registered
                office is at Unit 2A and 2P Building B Wembley Commercial Centre
                East Lane Wembley HA9 7UR ("Pill Sphere", we" "us" or "our")
                knows that you care how information about you ("Your Data") is
                used and shared and we appreciate your trust in us to do that
                carefully and sensibly. We respect your privacy and are
                committed to protecting Your Data.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                At Pill Sphere we are committed to safeguarding and preserving
                the privacy of our customers and website visitors.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                This Privacy Policy ("Policy") forms part of our website terms
                and conditions ("Website Terms"), as set out here. This Policy
                explains what happens to any personal information that you
                provide to us, or that we collect from you whilst you visit our
                site.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                We do update this Policy from time to time so please do review
                this Policy regularly.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">
              Important information about who we are
            </Typography>
            <Box>
              <Typography component="privacyPara" variant="body1">
                Pill Sphere is a controller and responsible for all personal
                data it receives and holds. We have appointed a data protection
                leader ("DPL") who is responsible for overseeing questions in
                relation to this Policy. If you have any questions about this
                Policy, including any requests to exercise your legal rights,
                please contact the DPL using the details set out below:
              </Typography>
              <Typography variant="h2">Full name of legal entity:</Typography>
              <Typography component="privacyPara" variant="body1">
                Pill Sphere LTD
              </Typography>
              <Typography variant="h2">Email address:</Typography>
              <Typography component="privacyPara" variant="body1">
                info@pillsphere.com
              </Typography>
              <Typography variant="h2">Postal address:</Typography>
              <Typography component="privacyPara" variant="body1">
                Unit 2A and 2P Building B Wembley Commercial Centre East Lane
                Wembley HA9 7UR
              </Typography>
              <Typography variant="h2">Telephone number:</Typography>
              <Typography component="privacyPara" variant="body1">
                02039165372
              </Typography>
              <Typography component="privacyPara" variant="body1">
                If you have any queries, concerns or complaints about the use of
                Your Data by us, please raise them with the DPL. If this does
                not resolve the problem to your satisfaction, or, if you prefer
                to raise the issue with somebody else, then please speak to
                Dwayne D'Souza who will deal with your complaint.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                You have the right to make a complaint at any time to the
                Information Commissioner's Office ("ICO"), the UK supervisory
                authority for data protection issues. We would, however,
                appreciate the chance to deal with your concerns before you
                approach the ICO so please contact us in the first instance.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                Changes to the Policy and your duty to inform us of the changes
              </Typography>
              <Typography component="privacyPara" variant="body1">
                This version was last updated in May 2018.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                It is important that the personal data we hold about you is
                accurate and current. Please keep us informed if Your Data
                changes during your relationship with us.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Information We Collect</Typography>
            <Box>
              <Typography component="privacyPara" variant="body1">
                If you register with us, we will collect personal data or
                personal information from you. Personal data or personal
                information means any information about an individual from which
                that person can be identified. It does not include data where a
                person's identity has been removed (anonymous data).
              </Typography>
            </Box>
            <Typography variant="h2">
              We may collect, use, store and transfer different kinds of data
              about you which we have categorised as follows:
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Identity Data includes first name, last name, date of birth and
                gender.
              </Typography>
              <Typography component="li" variant="body1">
                Contact Data includes delivery address email address and
                telephone numbers.
              </Typography>
              <Typography component="li" variant="body1">
                Financial Data includes bank account, payment records and
                payment card details.
              </Typography>
              <Typography component="li" variant="body1">
                Medical Data includes your patient medical records, Doctor
                details, patient notes, consultation notes and details of
                medicines you have ordered and order history. This category of
                data constitutes sensitive personal data for the purposes of
                data protection legislation. This will only be collected where
                you have expressly provided your consent to provide us with this
                data through any online forms and medical questionnaires you
                complete and send to us, telephone conversations and secure
                messaging with us, as well as through photo assessments.
              </Typography>
              <Typography component="li" variant="body1">
                Marketing and Communications Data includes your preferences in
                receiving marketing from us and our third parties and your
                communication preferences.
              </Typography>
            </Box>
            <Box>
              <Typography component="privacyPara" variant="body1">
                We also collect and use Aggregated Data such as statistical or
                demographic data for internal purposes. Aggregated Data may be
                derived from Your Data but is not personal data as it does not
                directly or indirectly reveal your identity. For example, we may
                aggregate information about how you use our website and services
                to calculate the percentage of users accessing a specific
                website feature, but this is anonymised. However, if we combine
                or connect Aggregated Data with Your Data so that it can
                directly or indirectly identify you, we treat the combined data
                as personal data which will be used in accordance with this
                Policy.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">How is Your Data collected?</Typography>
            {/****** li *****/}
            <Box>
              <Typography className="privacyPara" variant="body1">
                We use different methods to collect data from and about you,
                including through:
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Automated technologies or interactions If you interact with our
                website, we may automatically collect data about your equipment,
                browsing actions and patterns. When you visit our website, we
                automatically collect information about your use of our site
                including details of your visits such as pages viewed and the
                resources that you access. Such information may include
                Aggregated Data, traffic data, location data and other
                communication data. For more information about the cookies we
                use, please see our Cookie Policy.
              </Typography>
            </Box>
            {/* /////// */}
            <Typography variant="h2">
              Direct interactions You may give us your Identity, Contact,
              Medical and Financial Data by filling in forms, or by
              corresponding with us by post, phone, email or otherwise. This
              includes personal data you provide when you:
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                make an online enquiry;
              </Typography>
              <Typography component="li" variant="body1">
                completing forms and medical questionnaires on our website. This
                includes information provided at the time of registering to use
                our site, subscribing to our service, consultations for
                treatments, posting material or requesting further services;
              </Typography>
              <Typography component="li" variant="body1">
                make an online enquiry;
              </Typography>
              <Typography component="li" variant="body1">
                subscribe to our services or publications;
              </Typography>
              <Typography component="li" variant="body1">
                Request marketing material to be sent to you;
              </Typography>
              <Typography component="li" variant="body1">
                provide us with feedback.
              </Typography>
            </Box>
            {/***********/}
            <Typography variant="h2">Confidentiality</Typography>
            {/****** li *****/}
            <Box>
              <Typography className="privacyPara" variant="body1">
                Your Medical Data is treated confidentiality, which means that
                none of our staff can access it unless they are a healthcare
                professional (or owe a similar duty of confidentiality). We will
                never disclose Medical Data without your consent unless legally
                required or permitted to do so.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                We will not use your Medical Data to send you information about
                our products and services (i.e. for marketing purposes) unless
                you give us your express consent to use your Medical Data this
                way.
              </Typography>
            </Box>
            {/* //////// */}
            <Typography variant="h2">Use of Cookies</Typography>
            <Box>
              <Typography className="privacyPara" variant="body1">
                You can set your browser to refuse all or some browser cookies,
                or to alert you when websites set or access cookies. If you
                disable or refuse cookies, please note that some parts of this
                website may become inaccessible or not function properly. For
                more information about the cookies we use, please see our Cookie
                Policy.
              </Typography>
            </Box>
            {/* //////// */}
            <Typography variant="h2">Use of Your Information</Typography>
            <Typography variant="h2">
              We will only use the information that we collect from you as
              follows:
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                To enable us to provide our health services to you
              </Typography>
              <Typography component="li" variant="body1">
                To enable us to comply with regulatory requirements
              </Typography>
              <Typography component="li" variant="body1">
                To communicate with you in the event that there is a query or
                problem with your order
              </Typography>{" "}
              <Typography component="li" variant="body1">
                To inform you of any changes to our website, services or goods
                and products
              </Typography>{" "}
              <Typography component="li" variant="body1">
                For record-keeping purposes
              </Typography>{" "}
              <Typography component="li" variant="body1">
                To track and analyse activity on our website
              </Typography>
            </Box>
            {/***********/}
            {/* //////// */}
            <Typography variant="h2">Marketing purposes</Typography>
            <Typography className="privacyPara" variant="body1">
              We will only contact you for marketing purposes where you have
              given us your express consent to contact you for this purpose.
              Once you have given us your permission to contact you for
              marketing purposes, we may use Your Data for one or more of the
              following:
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                To provide information that you request from us relating to our
                products or services.
              </Typography>
              <Typography component="li" variant="body1">
                To provide information to you relating to other products that
                may be of interest to you.
              </Typography>
              <Typography component="li" variant="body1">
                To allow selected third parties to use Your Data to enable them
                to provide you with information regarding unrelated goods and
                services, which we believe may interest you.
              </Typography>

              <Typography className="privacyPara" variant="body1">
                You may change your mind and withdraw your permission for us to
                contact you for marketing purposes at any time by emailing us at
                info@pillsphere.com . This will not affect your use of our
                services.
              </Typography>
            </Box>
            {/* .............. */}

            <Typography variant="h2">
              Use of your Medical Data for marketing purposes
            </Typography>
            {/****** li *****/}
            <Box>
              <Typography className="privacyPara" variant="body1">
                Where you have given us your express permission in advance
                (separately to permitting us to send you more general marketing
                material), we may also use your Medical Data to send you
                specialist information about our products and services. For
                example, if a customer told us that they suffer from asthma and
                asked us to send them marketing material about asthma-related
                goods and services, we may do so. This information would never
                be shared with third parties to enable them to send you
                information regarding their goods and services.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                You can change your mind and withdraw your permission for us to
                use your Medical Data for marketing purposes at any time by
                emailing us at info@pillsphere.com . This will not affect your
                use of our services.
              </Typography>
            </Box>
            {/* .............. */}

            <Typography variant="h2">Change of purpose</Typography>
            {/****** li *****/}
            <Box>
              <Typography className="privacyPara" variant="body1">
                We will only use Your Data for the purposes for which we
                collected it, unless we reasonably consider that we need to use
                it for another reason and that reason is compatible with the
                original purpose. If you wish to get an explanation as to how
                the processing for the new purpose is compatible with the
                original purpose, please email info@pillsphere.com . Should we
                need to use Your Data for an unrelated purpose, we will notify
                you and we will explain the legal basis which allows us to do
                so.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Please note that we may process Your Data without your knowledge
                or consent, in compliance with the above rules, where this is
                required or permitted by law.
              </Typography>
            </Box>
            {/* .............. */}

            <Typography variant="h2">Storing Your Personal Data</Typography>
            {/****** li *****/}
            <Box>
              <Typography className="privacyPara" variant="body1">
                We have put in place appropriate security measures to prevent
                Your Data from being accidentally lost, used or accessed in an
                unauthorised way, altered or disclosed. In addition, we limit
                access to Your Data to those employees, agents, contractors and
                other
              </Typography>
              <Typography className="privacyPara" variant="body1">
                third parties who have a business need to know. They will only
                process Your Data on our instructions and they are subject to a
                duty of confidentiality.
              </Typography>{" "}
              <Typography className="privacyPara" variant="body1">
                We have put in place procedures to deal with any suspected
                personal data breach and will notify you and any applicable
                regulator of a breach where we are legally required to do so.
              </Typography>{" "}
              <Typography className="privacyPara" variant="body1">
                Please note that sending information via the internet is not
                totally secure and on occasion such information can be
                intercepted. We cannot guarantee the security of personal
                information that you choose to send us electronically and
                sending such information is entirely at your own risk.
              </Typography>
            </Box>

            {/* .............. */}

            <Typography variant="h2">Data retention</Typography>
            <Box>
              <Typography className="privacyPara" variant="body1">
                We will only retain Your Data for as long as necessary to fulfil
                the purposes we collected it for, including for the purposes of
                satisfying any legal, accounting, or reporting requirements.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                To determine the appropriate retention period for Your Data, we
                consider the amount, nature, and sensitivity of the personal
                data, the potential risk of harm from unauthorised use or
                disclosure of Your Data, the purposes for which we process Your
                Data and whether we can achieve those purposes through other
                means, and the applicable legal requirements.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                During the provision of our services to you we will retain Your
                Data to provide our goods or services to you.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                We are required by law to retain specific categories of Your
                Data for certain periods after we stop providing our goods or
                services to you. We are therefore required to store any Medical
                Data, Identity Data and Contact Data submitted to us to comply
                with our legal obligations.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Please note that we may keep Your Data for longer than the
                periods stated above if it is necessary. However, this will be
                assessed on a case by case basis. If we determine that it is
                necessary to keep Your Data for longer than the periods listed
                above, we will confirm this to you in writing when we have
                finished providing our goods and services to you and explain why
                it is necessary.
              </Typography>
            </Box>

            {/* //////// */}
            <Typography variant="h2">Disclosing Your Data</Typography>
            <Typography variant="h2">
              We may disclose Your Data to third parties, in accordance with
              this Policy, in the following circumstances:
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="li" variant="body1">
                Where permitted by law and subject to us taking steps to ensure
                that Your Data is properly protected and only used in accordance
                with this Policy, we may share your Identity, Contact, Financial
                and Medical Data with:
                <Typography component="li" variant="body1">
                  Your Doctor;
                </Typography>
                <Typography component="li" variant="body1">
                  Another business entity within the Shama Pharma group where
                  that business entity is providing a specific service as part
                  of our service to you (including to dispense and deliver
                  medicines you have ordered).
                </Typography>
                <Typography component="li" variant="body1">
                  Another third party, where you have provided your express
                  consent for us to share Your Data with them.
                </Typography>
              </Typography>
              <Typography component="li" variant="body1">
                We may share your Personal Data with External Third Parties to
                carry out processing activities on our behalf (for example, we
                may provide your postal address to a courier or we may share
                your name, address and age with a third- party service provider
                in order to verify your age and identity). The External Third
                Parties we work with include:
                <Typography component="li" variant="body1">
                  Super payments: To process your online payment.
                </Typography>
                <Typography component="li" variant="body1">
                  Feefo and Trustpilot: To assist with our review link and to
                  send you messages, such as emails containing invoices or
                  notifications concerning payments.
                </Typography>
                <Typography component="li" variant="body1">
                  Freshdesk: To react and respond to your enquiries directly.
                </Typography>
                <Typography component="li" variant="body1">
                  Hotjar: To monitor and identify usability website issues.
                </Typography>
                <Typography component="li" variant="body1">
                  Livechat and Facebook Messenger: To allow you to interact with
                  third-party live chat platforms directly from the pages of our
                  website, for contacting and being contacted by our support
                  service. This information is anonymised, so you cannot be
                  identified.
                </Typography>
                <Typography component="li" variant="body1">
                  Survey Monkey: We send anonymous surveys about your medical
                  treatment using SurveyMonkey for clinical governance. This
                  type of service allows you to interact with third-party online
                  survey platforms directly from the pages of our website.
                </Typography>
                <Typography component="li" variant="body1">
                  Amazon SES email servers: We send marketing emails to you if
                  you have consented to receive marketing material. We send
                  emails using the Amazon SES email servers. Emails are
                  customized using your order history.
                </Typography>
                <Typography component="li" variant="body1">
                  Mailchimp: If you register with our mailing list or sign up to
                  our newsletter, your email address will be added to our
                  marketing contact list through Mailchimp.
                </Typography>
                <Typography component="li" variant="body1">
                  Yay.com: We record telephone calls for monitoring and training
                  purposes which is kept for one month. This is used by the
                  patient and Pill Sphere in the event of a dispute, and in
                  order to manage and regulate the performance of our staff.
                </Typography>
              </Typography>
              <Typography component="li" variant="body1">
                We may share Marketing and Communications Data where you have
                provided your express consent for us to share such with third
                parties for marketing purposes.
              </Typography>{" "}
              <Typography component="li" variant="body1">
                We may also share Your Data where permitted by law:
                <Typography component="li" variant="body1">
                  In the event of a joint venture, collaboration, financing,
                  sale, merger or reorganisation of the company. If a change
                  happens to our business, then the new owners may use Your Data
                  in the same way as set out in this Policy.
                </Typography>{" "}
                <Typography component="li" variant="body1">
                  To further fraud protection and reduce the risk of fraud (for
                  example, to comply with anti-money laundering regulations).
                </Typography>
              </Typography>
              <Typography component="privacyPara" variant="body1">
                Other than in the specific circumstances set out above we will
                never share your Medical Data without your express consent.
              </Typography>
            </Box>
            {/* /// */}
            <Typography variant="h2">International transfers</Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="privacyPara" variant="body1">
                In addition to the disclosures set out in "Disclosing Your Data"
                above, some of our third parties are based outside the United
                Kingdom or European Union so their processing of Your Data will
                involve a transfer of data outside the United Kingdom European
                Union. Whenever we transfer Your Data out of the United Kingdom
                or European Union, we ensure a similar degree of protection is
                afforded to it by ensuring at least one of the following
                safeguards is implemented:
                <Typography component="li" variant="body1">
                  We will only transfer Your Data to countries that have been
                  deemed to provide an adequate level of protection for personal
                  data by the UK Government or the European Commission.
                </Typography>
                <Typography component="li" variant="body1">
                  Where we use certain service providers, we may use specific
                  contracts approved by the UK Government or the European
                  Commission which give personal data the same protection it has
                  in Europe.
                </Typography>
              </Typography>
              <Typography component="privacyPara" variant="body1">
                Please email info@pillsphere.com if you want further information
                on the specific mechanism used by us when transferring Your Data
                outside the United Kingdom or European Union.
              </Typography>
            </Box>
            {/* .............. */}

            <Typography variant="h2">Third Party Links</Typography>
            <Box>
              <Typography className="privacyPara" variant="body1">
                On occasion we include links to third-party websites, plug-ins
                and applications on this website. Clicking on those links or
                enabling those connections may allow third parties to collect or
                share data about you. We do not control these third-party
                websites and are not responsible for their privacy statements
                and/or policies. When you leave our website, we encourage you to
                read the privacy policy of every website you visit.
              </Typography>
            </Box>
            <Typography variant="h2">Your legal rights</Typography>
            <Box>
              <Typography className="privacyPara" variant="body1">
                In certain circumstances, you have the following rights under
                data protection laws in relation to Your Data. You have the
                right to:
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Request access to Your Data (commonly known as a "data subject
                access request"). This enables you to receive a copy of the Your
                Data we hold about you and to check that we are lawfully
                processing it.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Request correction of the personal data that we hold about you .
                This enables you to have any incomplete or inaccurate data we
                hold about you corrected, though we may need to verify the
                accuracy of the new data you provide to us.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Request erasure of Your Data . This enables you to ask us to
                delete or remove Your Data where there is no good reason for us
                continuing to process it. You also have the right to ask us to
                delete or remove Your Data where you have successfully exercised
                your right to object to processing (see below), where we may
                have processed Your Data unlawfully or where we are required to
                erase Your Data to comply with local law. Note, however, that we
                may not always be able to comply with your request of erasure
                for specific legal reasons which will be notified to you, if
                applicable, at the time of your request.
              </Typography>
              <Typography className="privacyPara" variant="body1">
                Object to processing of Your Data where we are relying on a
                legitimate interest (or those of a third party) and there is
                something about your situation which makes you want to object to
                processing on this ground as you feel it impacts on your
                fundamental rights and freedoms. You also have the right to
                object where we are processing Your Data for direct marketing
                purposes. In some cases, we may demonstrate that we have
                compelling legitimate grounds to process Your Data which
                override your rights and freedoms.
              </Typography>
            </Box>
            {/* /////// */}
            <Typography variant="h2">
              Request restriction of processing of Your Data . This enables you
              to ask us to suspend the processing of Your Data in the following
              scenarios:
            </Typography>
            {/****** li *****/}
            <Box component="ul" sx={{ pl: 3 }}>
              <Typography component="privacyPara" variant="body1">
                if you want us to establish the data's accuracy;
              </Typography>
              <Typography component="privacyPara" variant="body1">
                where our use of Your Data is unlawful, but you do not want us
                to erase it;
              </Typography>
              <Typography component="privacyPara" variant="body1">
                where you need us to hold Your Data even if we no longer require
                it as you need it to establish, exercise or defend legal claims;
                or
              </Typography>
              <Typography component="privacyPara" variant="body1">
                you have objected to our use of Your Data, but we need to verify
                whether we have overriding legitimate and/or legal grounds to
                use it.
              </Typography>
            </Box>
            {/* ///// */}
            <Box>
              <Typography component="privacyPara" variant="body1">
                Request the transfer of Your Data to you or to a third party. We
                will provide to you, or a third party you have chosen, Your Data
                in a structured, commonly used, machine- readable format. Note
                that this right only applies to automated information which you
                initially provided consent for us to use or where we used the
                information to perform a contract with you.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                Withdraw consent at any time where we are relying on consent to
                process Your Data. However, this will not affect the lawfulness
                of any processing carried out before you withdraw your consent.
                If you withdraw your consent, we may not be able to provide
                certain products or services to you. We will advise you if this
                is the case at the time you withdraw your consent. Please note
                that we may not be able to comply with this request where we
                have a legal obligation to keep Your Data.
              </Typography>
              <Typography component="privacyPara" variant="body1">
                If you wish to exercise any of the rights set out above, please
                email info@pillsphere.com or telephone 02039165372 and ask to
                speak to the DPL.
              </Typography>
            </Box>
            {/* //////// */}
            <Typography variant="h2">Data subject access request</Typography>
            <Box>
              <Typography component="privacyPara" variant="body1">
                You will not have to pay a fee to access Your Data (or to
                exercise any of the other rights set out above). However, we may
                charge a reasonable fee if your request is clearly unfounded,
                repetitive or excessive. Alternatively, we may refuse to comply
                with your request in these circumstances.
              </Typography>
            </Box>
            {/* //////// */}
            <Typography variant="h2">What we may need from you</Typography>
            <Box>
              <Typography component="privacyPara" variant="body1">
                We may need to request specific information from you to help us
                confirm your identity and ensure your right to access Your Data
                (or to exercise any of your other rights). This is a security
                measure to ensure that personal data is not disclosed to any
                person who has no right to receive it. We may also contact you
                to ask you for further information in relation to your request
                to speed up our response.
              </Typography>
            </Box>
            {/* //////// */}
            <Typography variant="h2">Time limit to respond</Typography>
            <Box>
              <Typography component="privacyPara" variant="body1">
                We try to respond to all legitimate requests within one month.
                Occasionally it may take us longer than a month if your request
                is particularly complex or you have made several requests. In
                this case, we will notify you and keep you updated.
              </Typography>
            </Box>
            {/* //////// */}
            <Typography variant="h2">Contacting Us</Typography>
            <Box>
              <Typography component="privacyPara" variant="body1">
                Please do not hesitate to contact us regarding any matter
                relating to this Policy at info@pillsphere.com
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PrivacyPolicy;
