// Import
import {gql} from "@apollo/client";
import {motion} from "framer-motion";
import {client} from "../config/apollo";
import {getThemesOptionsContent} from "../lib/themesOptions";
import {getMainMenuLinks, getFooterMenuLinks} from "../lib/MenuLinks";

// Components
import Footer from "@/components/Footer";
import HeroTwo from "@/components/HeroTwo";
import MetaTag from "../components/Meta/MetaTag";
import ContactInfo from "@/components/ContactInfo";
import StoreLocation from "@/components/StoreLocation";

const contactUs = ({
	seo,
	pageTitle,
	content,
	mainMenuLinks,
	footerMenuLinks,
	themesOptionsContent,
}: any) => {
	return (
		<motion.div
			exit={{
				opacity: 0,
			}}
			initial="initial"
			animate="animate"
		>
			{/* <!--===== META TAG =====--> */}
			<MetaTag title={pageTitle} seo={seo} />

			<main>
				<HeroTwo
					title={content?.heroSection?.title}
					email={themesOptionsContent?.email}
					paragraph={content?.heroSection?.paragraph}
					mainMenuLinks={mainMenuLinks?.mainMenuLinks}
					twitterLink={themesOptionsContent?.twitterLink}
					phoneNumber={themesOptionsContent?.phoneNumber}
					linkedinLink={themesOptionsContent?.linkedinLink}
					facebookLink={themesOptionsContent?.facebookLink}
					backgroundImage={content?.heroSection?.backgroundImage?.sourceUrl}
				/>

				<ContactInfo
					email={themesOptionsContent?.email}
					title={content?.contactInfo?.title}
					paragraph={content?.contactInfo?.paragraph}
					contactAddress={themesOptionsContent?.address}
					phoneNumber={themesOptionsContent?.phoneNumber}
					phoneNumberTwo={themesOptionsContent?.phoneNumberTwo}
				/>

				<StoreLocation
					title={content?.ourLocation?.title}
					paragraph={content?.ourLocation?.paragraph}
				/>

				<Footer
					email={themesOptionsContent?.email}
					phoneNumber={themesOptionsContent?.phoneNumber}
					twitterLink={themesOptionsContent?.twitterLink}
					facebookLink={themesOptionsContent?.facebookLink}
					linkedinLink={themesOptionsContent?.linkedinLink}
					footerMenuLinks={footerMenuLinks?.footerMenuLinks}
					copyRightText={themesOptionsContent?.copyrightText}
				/>
			</main>
		</motion.div>
	);
};

export async function getStaticProps() {
	const getContactUsPageContent: any = gql`
		{
			pageTitle: pages(where: {id: 8, status: PUBLISH}) {
				edges {
					node {
						title
					}
				}
			}
			mainContent: pages(where: {id: 8, status: PUBLISH}) {
				edges {
					node {
						seo {
							canonical
							cornerstone
							focuskw
							fullHead
							metaDesc
							metaKeywords
							metaRobotsNofollow
							metaRobotsNoindex
							opengraphAuthor
							opengraphDescription
							opengraphImage {
								mediaItemUrl
							}
							opengraphModifiedTime
							opengraphPublishedTime
							opengraphPublisher
							opengraphSiteName
							opengraphTitle
							opengraphType
							opengraphUrl
							readingTime
							title
							twitterDescription
							twitterTitle
							twitterImage {
								mediaItemUrl
							}
						}
						contactUsPage {
							heroSection {
								title
								paragraph
								backgroundImage {
									sourceUrl
								}
							}
							contactInfo {
								title
								paragraph
							}
							ourLocation {
								title
								paragraph
							}
						}
					}
				}
			}
		}
	`;

	const response: any = await client.query({
		query: getContactUsPageContent,
	});

	const mainMenuLinks: object = await getMainMenuLinks();
	const footerMenuLinks: object = await getFooterMenuLinks();
	const themesOptionsContent: object = await getThemesOptionsContent();

	return {
		props: {
			mainMenuLinks,
			footerMenuLinks,
			themesOptionsContent,
			seo: response?.data?.mainContent?.edges[0]?.node?.seo,
			pageTitle: response?.data?.pageTitle?.edges[0]?.node?.title,
			content: response.data?.mainContent?.edges[0]?.node?.contactUsPage,
		},
		revalidate: 60,
	};
}

export default contactUs;
